import jwt
from datetime import datetime, timedelta
from django.conf import settings
from django.contrib.auth import authenticate
from django.utils import timezone
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from .models import User, Project, Evaluation

# Generate a simple JWT token
def get_tokens_for_user(user):
    payload = {
        'user_id': user.id,
        'email': user.email,
        'role': user.role,
        'exp': datetime.utcnow() + timedelta(days=1),
        'iat': datetime.utcnow()
    }
    token = jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
    return token

@api_view(['POST'])
@permission_classes([AllowAny])
def signup(request):
    data = request.data
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    role = data.get('role', 'student')

    if not email or not password or not username:
        return Response({'detail': 'Username, email and password required'}, status=status.HTTP_400_BAD_REQUEST)
    
    if User.objects.filter(username=username).exists() or User.objects.filter(email=email).exists():
        return Response({'detail': 'User with this username or email already exists'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.create_user(username=username, email=email, password=password, role=role)
    
    token = get_tokens_for_user(user)
    return Response({
        'access_token': token,
        'token_type': 'bearer',
        'role': user.role
    }, status=status.HTTP_201_CREATED)

@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    # auth.js sends data as form-urlencoded 'username' and 'password'
    username = request.data.get('username')
    password = request.data.get('password')

    user = authenticate(username=username, password=password)
    
    if user is not None:
        token = get_tokens_for_user(user)
        return Response({
            'access_token': token,
            'token_type': 'bearer',
            'role': user.role
        }, status=status.HTTP_200_OK)
    else:
        return Response({'detail': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['POST'])
@permission_classes([AllowAny])
def submit_project(request):
    auth_header = request.headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        return Response({'detail': 'Unauthorized'}, status=status.HTTP_401_UNAUTHORIZED)
    
    token = auth_header.split(' ')[1]
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        user = User.objects.get(id=payload['user_id'])
    except Exception:
        return Response({'detail': 'Invalid token'}, status=status.HTTP_401_UNAUTHORIZED)

    title = request.data.get('title')
    description = request.data.get('description')
    evaluation_role = request.data.get('evaluation_role', user.role)
    
    if not title or not description:
        return Response({'detail': 'Title and description required'}, status=status.HTTP_400_BAD_REQUEST)

    file_obj = request.FILES.get('files')
    project = Project.objects.create(
        user=user,
        title=title,
        description=description,
        file_path=file_obj
    )

    from .ai_service import evaluate_project_with_ai
    evaluation_data = evaluate_project_with_ai(title, description, evaluation_role)
    
    evaluation = Evaluation.objects.create(
        project=project,
        evaluator_role=evaluation_role,
        total_score=evaluation_data.get('score', 0),
        evaluation_data=evaluation_data
    )

    return Response({'message': 'Success', 'evaluation_id': evaluation.id}, status=status.HTTP_201_CREATED)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_evaluation(request, evaluation_id):
    try:
        evaluation = Evaluation.objects.select_related('project').get(id=evaluation_id)
        local_time = timezone.localtime(evaluation.created_at)
        return Response({
            'id': evaluation.id,
            'project_title': evaluation.project.title,
            'role': evaluation.evaluator_role,
            'total_score': evaluation.total_score,
            'data': evaluation.evaluation_data,
            'created_at': local_time.strftime('%d/%m/%Y, %I:%M:%S %p').lower()
        }, status=status.HTTP_200_OK)
    except Evaluation.DoesNotExist:
        return Response({'detail': 'Evaluation not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_user_evaluations(request):
    auth_header = request.headers.get('Authorization')
    user = None
    if auth_header and auth_header.startswith('Bearer '):
        token = auth_header.split(' ')[1]
        try:
            payload = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
            user = User.objects.get(id=payload['user_id'])
        except Exception:
            pass

    if user:
        projects = Project.objects.filter(user=user).prefetch_related('evaluations').order_by('-created_at')
    else:
        projects = Project.objects.prefetch_related('evaluations').order_by('-created_at')[:10]

    result = []
    for p in projects:
        evals = list(p.evaluations.order_by('-created_at'))
        if not evals:
            continue
        latest_eval = evals[0]
        revisions = []
        total_evals = len(evals)
        for idx, ev in enumerate(evals):
            local_time = timezone.localtime(ev.created_at)
            revisions.append({
                'id': ev.id,
                'revision_number': total_evals - idx,
                'role': ev.evaluator_role,
                'score': round(ev.total_score) if ev.total_score is not None else 0,
                'created_at': local_time.strftime('%d/%m/%Y, %I:%M:%S %p').lower()
            })
        result.append({
            'project_id': p.id,
            'title': p.title,
            'description': p.description,
            'revision_count': len(revisions),
            'latest_score': round(latest_eval.total_score) if latest_eval.total_score is not None else 0,
            'revisions': revisions
        })

    return Response({'projects': result}, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([AllowAny])
def get_admin_stats(request):
    users_qs = User.objects.all().order_by('-date_joined')
    users_by_role = {
        'student': [],
        'manager': [],
        'developer': [],
        'admin': [],
        'all': []
    }
    
    for u in users_qs:
        local_time = timezone.localtime(u.date_joined)
        projects_count = u.projects.count()
        
        # Admin is strictly separate from Manager / TL
        is_admin_user = (u.role == 'admin' or u.is_staff or u.is_superuser or u.username.lower() == 'admin')
        user_role = 'admin' if is_admin_user else u.role
        
        user_info = {
            'id': u.id,
            'username': u.username,
            'email': u.email or 'Not provided',
            'role': user_role,
            'projects_count': projects_count,
            'is_staff': is_admin_user,
            'date_joined': local_time.strftime('%d/%m/%Y, %I:%M:%S %p').lower()
        }
        
        if is_admin_user:
            users_by_role['admin'].append(user_info)
        elif user_role in users_by_role:
            users_by_role[user_role].append(user_info)
        else:
            users_by_role['student'].append(user_info)
            
        users_by_role['all'].append(user_info)

    evaluations_count = Evaluation.objects.count()

    recent_evals = Evaluation.objects.select_related('project', 'project__user').order_by('-created_at')[:20]
    
    activity = []
    for ev in recent_evals:
        local_time = timezone.localtime(ev.created_at)
        user_name = ev.project.user.username if ev.project.user else 'Anonymous'
        activity.append({
            'evaluation_id': ev.id,
            'project_title': ev.project.title,
            'username': user_name,
            'user_role': ev.project.user.role if ev.project.user else 'student',
            'evaluation_role': ev.evaluator_role,
            'score': round(ev.total_score) if ev.total_score is not None else 0,
            'status': 'Completed',
            'created_at': local_time.strftime('%d/%m/%Y, %I:%M:%S %p').lower()
        })

    all_projects = Project.objects.select_related('user').prefetch_related('evaluations').order_by('-created_at')[:20]
    queue = []
    for p in all_projects:
        latest = p.evaluations.order_by('-created_at').first()
        local_time = timezone.localtime(p.created_at)
        queue.append({
            'project_id': p.id,
            'title': p.title,
            'username': p.user.username if p.user else 'Anonymous',
            'role': latest.evaluator_role if latest else (p.user.role if p.user else 'student'),
            'score': round(latest.total_score) if latest and latest.total_score is not None else 'N/A',
            'evaluation_id': latest.id if latest else None,
            'status': 'Evaluated' if latest else 'Queued',
            'created_at': local_time.strftime('%d/%m/%Y, %I:%M:%S %p').lower()
        })

    return Response({
        'counts': {
            'students': len(users_by_role['student']),
            'managers': len(users_by_role['manager']),
            'developers': len(users_by_role['developer']),
            'evaluations': evaluations_count,
        },
        'users': users_by_role,
        'activity': activity,
        'queue': queue
    }, status=status.HTTP_200_OK)

@api_view(['DELETE', 'POST'])
@permission_classes([AllowAny])
def delete_evaluation(request, evaluation_id):
    try:
        evaluation = Evaluation.objects.get(id=evaluation_id)
        project = evaluation.project
        evaluation.delete()
        # Clean up empty project if no evaluations remain
        if project and project.evaluations.count() == 0:
            project.delete()
        return Response({'message': 'Evaluation deleted successfully'}, status=status.HTTP_200_OK)
    except Evaluation.DoesNotExist:
        return Response({'detail': 'Evaluation not found'}, status=status.HTTP_404_NOT_FOUND)

@api_view(['DELETE', 'POST'])
@permission_classes([AllowAny])
def delete_project(request, project_id):
    try:
        project = Project.objects.get(id=project_id)
        project.delete()
        return Response({'message': 'Project and associated records deleted successfully'}, status=status.HTTP_200_OK)
    except Project.DoesNotExist:
        return Response({'detail': 'Project not found'}, status=status.HTTP_404_NOT_FOUND)


from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Float
from sqlalchemy.sql import func
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    role = Column(String(50), nullable=False) # student, manager, developer, admin
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Project(Base):
    __tablename__ = "projects"
    
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    file_path = Column(String(500), nullable=True) # Optional file/folder path
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class Evaluation(Base):
    __tablename__ = "evaluations"
    
    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"))
    evaluator_role = Column(String(50), nullable=False) # Evaluated FROM this perspective
    total_score = Column(Float, nullable=True)
    evaluation_data = Column(Text, nullable=False) # JSON string of detailed evaluation
    created_at = Column(DateTime(timezone=True), server_default=func.now())

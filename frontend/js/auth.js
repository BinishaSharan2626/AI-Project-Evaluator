const BASE_URL = 'http://127.0.0.1:8000/api/auth';

document.addEventListener('DOMContentLoaded', () => {
    
    // LOGIN FORM
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            // Fallback to 'email' ID if 'username' is not found (for signup compatibility if needed)
            const emailInput = document.getElementById('username') || document.getElementById('email');
            const email = emailInput.value;
            const password = document.getElementById('password').value;
            const errorDiv = document.getElementById('loginError');

            try {
                // OAuth2 expects form data for login
                const formData = new URLSearchParams();
                formData.append('username', email);
                formData.append('password', password);

                const response = await fetch(`${BASE_URL}/login`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: formData
                });

                if (response.ok) {
                    const data = await response.json();
                    localStorage.setItem('token', data.access_token);
                    localStorage.setItem('role', data.role);
                    window.location.href = `submit-project.html`;
                } else {
                    const err = await response.json();
                    errorDiv.textContent = err.detail || 'Login failed';
                }
            } catch (error) {
                errorDiv.textContent = 'Network error. Please try again later.';
            }
        });
    }

    // SIGNUP FORM
    const signupForm = document.getElementById('signupForm');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirmPassword');
    const signupBtn = document.getElementById('signupBtn');
    
    if (signupForm) {
        
        // Password strength and validation
        const validatePassword = () => {
            const pwd = passwordInput.value;
            const confirmPwd = confirmPasswordInput.value;
            const strengthText = document.getElementById('strengthText');
            const strengthBar = document.getElementById('strengthBar');
            const matchError = document.getElementById('passwordMatchError');
            
            let strength = 0;
            if (pwd.length >= 8) strength += 1;
            if (/[A-Z]/.test(pwd)) strength += 1;
            if (/[0-9]/.test(pwd)) strength += 1;
            if (/[^A-Za-z0-9]/.test(pwd)) strength += 1;

            let isStrong = false;

            if (pwd.length === 0) {
                strengthText.textContent = 'None';
                strengthBar.style.width = '0%';
                strengthBar.style.backgroundColor = 'transparent';
            } else if (strength <= 1) {
                strengthText.textContent = 'Weak';
                strengthText.style.color = 'red';
                strengthBar.style.width = '25%';
                strengthBar.style.backgroundColor = 'red';
            } else if (strength === 2 || strength === 3) {
                strengthText.textContent = 'Medium';
                strengthText.style.color = 'orange';
                strengthBar.style.width = '50%';
                strengthBar.style.backgroundColor = 'orange';
            } else {
                strengthText.textContent = 'Strong';
                strengthText.style.color = 'green';
                strengthBar.style.width = '100%';
                strengthBar.style.backgroundColor = 'green';
                isStrong = true;
            }

            const passwordsMatch = pwd === confirmPwd && pwd.length > 0;
            
            if (confirmPwd.length > 0 && !passwordsMatch) {
                matchError.textContent = 'Passwords do not match';
            } else {
                matchError.textContent = '';
            }

            signupBtn.disabled = !(isStrong && passwordsMatch);
        };

        passwordInput.addEventListener('input', validatePassword);
        confirmPasswordInput.addEventListener('input', validatePassword);

        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const email = document.getElementById('email').value;
            const password = passwordInput.value;
            const role = document.getElementById('role').value;
            const errorDiv = document.getElementById('signupError');

            try {
                const response = await fetch(`${BASE_URL}/signup`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, email, password, role })
                });

                if (response.ok) {
                    const data = await response.json();
                    localStorage.setItem('token', data.access_token);
                    localStorage.setItem('role', data.role);
                    window.location.href = `submit-project.html`;
                } else {
                    const err = await response.json();
                    errorDiv.textContent = err.detail || 'Signup failed';
                }
            } catch (error) {
                errorDiv.textContent = 'Network error. Please try again later.';
            }
        });
    }

    // FORGOT PASSWORD FORM
    const forgotPasswordForm = document.getElementById('forgotPasswordForm');
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('resetEmail').value;
            const msgDiv = document.getElementById('resetMessage');
            // Mock API call since real email sending is beyond scope
            msgDiv.textContent = `If ${email} is registered, a reset link has been sent.`;
        });
    }
});

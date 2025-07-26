function loginUser() {
    const name = document.getElementById('login-name').value.trim();
    const password = document.getElementById('login-password').value.trim();
    
    const nameError = document.getElementById('name-error');
    const passwordError = document.getElementById('password-error');
    
    // Clear previous errors
    nameError.textContent = '';
    passwordError.textContent = '';
    
    let hasError = false;
    
    // Validate inputs
    if (!name) {
      nameError.textContent = 'Name is required';
      hasError = true;
    }
    
    if (!password) {
      passwordError.textContent = 'Password is required';
      hasError = true;
    }
    
    if (hasError) return;
    
    // Check credentials
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.name.toLowerCase() === name.toLowerCase());
    
    if (!user) {
      nameError.textContent = 'User not found';
      return;
    }
    
    if (user.password !== password) {
      passwordError.textContent = 'Incorrect password';
      return;
    }
    
    // Successful login
    user.lastLogin = new Date().toLocaleString();
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', user.name);
    
    // Redirect to previous page or profile
    const redirectTo = sessionStorage.getItem('redirectAfterLogin') || 'profile.html';
    sessionStorage.removeItem('redirectAfterLogin');
    window.location.href = redirectTo;
}

function showForgotPassword() {
    document.getElementById('forgot-password-section').style.display = 'block';
}

function recoverPassword() {
    const name = document.getElementById('recovery-name').value.trim();
    const mobile = document.getElementById('recovery-mobile').value.trim();
    const resultDiv = document.getElementById('password-recovery-result');
    
    if (!name || !mobile) {
        resultDiv.innerHTML = '<p class="error-msg">Please enter both name and mobile number</p>';
        return;
    }
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => 
        u.name.toLowerCase() === name.toLowerCase() && 
        u.mobile === mobile
    );
    
    if (!user) {
        resultDiv.innerHTML = '<p class="error-msg">No account found with these details</p>';
        return;
    }
    
    // Show the current password and option to change it
    resultDiv.innerHTML = `
        <p>Account found! Your current password is: <strong>${user.password}</strong></p>
        <p class="help">For security reasons, we recommend changing your password.</p>
    `;
    document.getElementById('change-password-section').style.display = 'block';
}

function changePassword() {
    const newPassword = document.getElementById('new-password').value.trim();
    const confirmPassword = document.getElementById('confirm-new-password').value.trim();
    const name = document.getElementById('recovery-name').value.trim();
    const resultDiv = document.getElementById('password-recovery-result');
    
    if (!newPassword || !confirmPassword) {
        resultDiv.innerHTML += '<p class="error-msg">Please enter and confirm your new password</p>';
        return;
    }
    
    if (newPassword !== confirmPassword) {
        resultDiv.innerHTML += '<p class="error-msg">Passwords do not match</p>';
        return;
    }
    
    // Validate password strength (same as registration)
    const validPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    if (!validPassword.test(newPassword)) {
        resultDiv.innerHTML += '<p class="error-msg">Password must be 8+ characters with letters and numbers</p>';
        return;
    }
    
    // Update password in localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.name.toLowerCase() === name.toLowerCase());
    
    if (userIndex !== -1) {
        users[userIndex].password = newPassword;
        localStorage.setItem('users', JSON.stringify(users));
        resultDiv.innerHTML += '<p class="success-msg">Password updated successfully! You can now login with your new password.</p>';
        document.getElementById('change-password-section').style.display = 'none';
    }
}
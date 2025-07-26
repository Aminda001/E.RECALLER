function togglePassword(inputId) {
    const passwordInput = document.getElementById(inputId);
    const toggleText = passwordInput.nextElementSibling;
    
    if (passwordInput.type === "password") {
      passwordInput.type = "text";
      toggleText.textContent = "Hide Password";
    } else {
      passwordInput.type = "password";
      toggleText.textContent = "Show Password";
    }
  }
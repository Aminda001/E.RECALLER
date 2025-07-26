// register.js
document.addEventListener('DOMContentLoaded', function() {
  const registerForm = document.getElementById('registerForm');
  
  if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
      e.preventDefault();
      registerUser();
    });
  }
});

function registerUser() {
  const name = document.getElementById("name").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirm = document.getElementById("confirm").value.trim();
  const mobile = document.getElementById("mobile").value.trim();

  const nameError = document.getElementById("name-error");
  const passwordError = document.getElementById("password-error");
  const confirmError = document.getElementById("confirm-error");
  const mobileError = document.getElementById("mobile-error");

  // Clear previous errors
  nameError.textContent = "";
  passwordError.textContent = "";
  confirmError.textContent = "";
  mobileError.textContent = "";

  let hasError = false;

  // Validate name
  if (!name) {
    nameError.textContent = "Name is required";
    hasError = true;
  } else if (name.length < 3) {
    nameError.textContent = "Name must be at least 3 characters";
    hasError = true;
  }

  // Validate password
  const validPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  if (!password) {
    passwordError.textContent = "Password is required";
    hasError = true;
  } else if (!validPassword.test(password)) {
    passwordError.textContent = "Password must be 8+ characters with letters and numbers";
    hasError = true;
  }

  // Validate confirm password
  if (password !== confirm) {
    confirmError.textContent = "Passwords do not match";
    hasError = true;
  }

  // Validate mobile
  const validMobile = /^[0-9]{10}$/;
  if (!mobile) {
    mobileError.textContent = "Mobile number is required";
    hasError = true;
  } else if (!validMobile.test(mobile)) {
    mobileError.textContent = "Please enter a valid 10-digit number";
    hasError = true;
  }

  if (!hasError) {
    try {
      // Initialize users array properly
      const users = JSON.parse(localStorage.getItem("users") || "[]");
      
      // Check if user already exists
      const userExists = users.some(user => 
        user.name.toLowerCase() === name.toLowerCase() || 
        user.mobile === mobile
      );
      
      if (userExists) {
        nameError.textContent = "Username or mobile number already registered";
        return;
      }

      // Create new user
      const newUser = {
        name,
        password, // Note: In production, you should NEVER store passwords in plain text
        mobile,
        createdAt: new Date().toISOString(),
        lastLogin: null,
        profileComplete: false
      };

      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users));
      
      // Show success message
      alert("Account created successfully!\nYou will now be redirected to login.");
      window.location.href = "login.html";
    } catch (error) {
      console.error("Registration error:", error);
      alert("An error occurred during registration. Please try again.");
    }
  }
}

function togglePassword(fieldId) {
  const field = document.getElementById(fieldId);
  const toggle = field.nextElementSibling;
  
  if (field.type === "password") {
    field.type = "text";
    toggle.textContent = "Hide Password";
  } else {
    field.type = "password";
    toggle.textContent = "Show Password";
  }
}
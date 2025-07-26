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

function toggleMenu() {
  const navLinks = document.querySelector('.nav-links');
  const hamburger = document.querySelector('.hamburger');
  const closeIcon = document.querySelector('.close-icon');
  
  navLinks.classList.toggle('show');
  
  // Toggle hamburger/close icon
  if (navLinks.classList.contains('show')) {
    hamburger.style.display = 'none';
    closeIcon.style.display = 'inline';
  } else {
    hamburger.style.display = 'inline';
    closeIcon.style.display = 'none';
  }
}

// Close menu when clicking on a link (for mobile)
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      toggleMenu();
    }
  });
});

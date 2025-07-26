// help.js
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all FAQ answers as hidden
  document.querySelectorAll('.faq-answer').forEach(answer => {
    answer.style.display = 'none';
  });
  
  // Check authentication to show appropriate links
  const currentUser = localStorage.getItem('currentUser');
  const profileLink = document.getElementById('profile-link');
  
  if (!currentUser && profileLink) {
    profileLink.style.display = 'none';
  }
  
  // Add click handlers for FAQ items
  document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function() {
      const answer = this.nextElementSibling;
      const icon = this.querySelector('i');
      
      // Toggle answer visibility
      if (answer.style.display === 'block') {
        answer.style.display = 'none';
        icon.classList.replace('fa-chevron-up', 'fa-chevron-down');
      } else {
        answer.style.display = 'block';
        icon.classList.replace('fa-chevron-down', 'fa-chevron-up');
      }
    });
  });
});


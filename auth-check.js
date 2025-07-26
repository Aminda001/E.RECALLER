document.addEventListener('DOMContentLoaded', function() {
  const currentUser = localStorage.getItem('currentUser');
  const guestButtons = document.getElementById('guest-buttons');
  const memberButtons = document.getElementById('member-buttons');
  
  if (currentUser) {
    // User is logged in
    if (guestButtons) guestButtons.classList.add('hidden');
    if (memberButtons) memberButtons.classList.remove('hidden');
  } else {
    // User is not logged in
    if (guestButtons) guestButtons.classList.remove('hidden');
    if (memberButtons) memberButtons.classList.add('hidden');
  }
});
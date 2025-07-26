// profile.js
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
        alert('Please log in to view your profile');
        window.location.href = 'login.html';
        return;
    }

    // Load user data
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(u => u.name === currentUser);
    
    if (!user) {
        alert('User data not found');
        localStorage.removeItem('currentUser');
        window.location.href = 'login.html';
        return;
    }

    // Populate form fields
    document.getElementById('profile-name').value = user.name || '';
    
    // Format mobile number
    if (user.mobile) {
        const formattedMobile = `+94 ${user.mobile.substring(0, 2)} ${user.mobile.substring(2, 5)} ${user.mobile.substring(5)}`;
        document.getElementById('profile-mobile').textContent = formattedMobile;
    } else {
        document.getElementById('profile-mobile').textContent = 'Not provided';
    }
    
    document.getElementById('profile-birthday').value = user.birthday || '';
    document.getElementById('profile-gender').value = user.gender || '';
    document.getElementById('profile-country').value = user.country || '';
    
    // Set profile picture
    const profilePic = document.getElementById('profile-picture');
    if (user.profilePicture) {
        profilePic.src = user.profilePicture;
    } else {
        // Default avatar SVG
        profilePic.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23003366'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z'/%3E%3C/svg%3E";
    }

    // Profile picture upload handler
    document.getElementById('picture-upload').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (!file) return;

        // Validate file
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }

        if (file.size > 1024 * 1024) { // 1MB limit
            alert('Image size should be less than 1MB');
            return;
        }

        const reader = new FileReader();
        reader.onload = function(event) {
            const img = document.getElementById('profile-picture');
            img.src = event.target.result;
            
            // Auto-save the new picture
            const users = JSON.parse(localStorage.getItem('users') || '[]');
            const userIndex = users.findIndex(u => u.name === currentUser);
            if (userIndex !== -1) {
                users[userIndex].profilePicture = event.target.result;
                localStorage.setItem('users', JSON.stringify(users));
                showToast('Profile picture updated!');
            }
        };
        reader.readAsDataURL(file);
    });
});

function updateProfile() {
    const currentUser = localStorage.getItem('currentUser');
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.name === currentUser);
    
    if (userIndex === -1) {
        alert('User not found');
        return;
    }

    // Validate name
    const newName = document.getElementById('profile-name').value.trim();
    if (!newName) {
        alert('Name cannot be empty');
        return;
    }

    // Check if name is changed and already exists
    if (newName !== currentUser) {
        const nameExists = users.some(u => u.name.toLowerCase() === newName.toLowerCase());
        if (nameExists) {
            alert('This name is already taken');
            return;
        }
    }

    // Update user data
    users[userIndex] = {
        ...users[userIndex],
        name: newName,
        birthday: document.getElementById('profile-birthday').value,
        gender: document.getElementById('profile-gender').value,
        country: document.getElementById('profile-country').value,
        profilePicture: document.getElementById('profile-picture').src.startsWith('data:image') ? 
                        document.getElementById('profile-picture').src : 
                        users[userIndex].profilePicture
    };

    // Save to localStorage
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('currentUser', newName);
    
    showToast('Profile updated successfully!');
}

function logout() {
    localStorage.removeItem('currentUser');
    window.location.href = 'login.html';
}

function confirmDelete() {
    if (confirm('Are you sure you want to delete your account? All your data will be permanently removed.')) {
        deleteAccount();
    }
}

function deleteAccount() {
    const currentUser = localStorage.getItem('currentUser');
    let users = JSON.parse(localStorage.getItem('users') || '[]');
    
    users = users.filter(u => u.name !== currentUser);
    
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.removeItem('currentUser');
    
    alert('Account deleted successfully');
    window.location.href = 'index.html';
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, 3000);
}
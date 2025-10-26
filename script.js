const form = document.getElementById('registrationForm');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');

const usernameError = document.getElementById('usernameError');
const emailError = document.getElementById('emailError');
const passwordError = document.getElementById('passwordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');
const successMessage = document.getElementById('successMessage');

// Helper validation functions
function isEmailValid(email) {
  // Simple email regex for demonstration
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isPasswordStrong(password) {
  // Min 8 chars, 1 uppercase, 1 lowercase, 1 digit, 1 special char
  return /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[\W_]).{8,}$/.test(password);
}

function setFieldState(input, errorDiv, message) {
  if (message) {
    input.classList.remove('valid');
    input.classList.add('invalid');
    errorDiv.textContent = message;
  } else {
    input.classList.remove('invalid');
    input.classList.add('valid');
    errorDiv.textContent = '';
  }
}

// Real-time validation
username.addEventListener('input', () => {
  if (!username.value.trim()) {
    setFieldState(username, usernameError, 'Username is required.');
  } else if (username.value.trim().length < 3) {
    setFieldState(username, usernameError, 'Username must be at least 3 characters.');
  } else {
    setFieldState(username, usernameError, '');
  }
});

email.addEventListener('input', () => {
  if (!email.value.trim()) {
    setFieldState(email, emailError, 'Email is required.');
  } else if (!isEmailValid(email.value.trim())) {
    setFieldState(email, emailError, 'Enter a valid email address.');
  } else {
    setFieldState(email, emailError, '');
  }
});

password.addEventListener('input', () => {
  if (!password.value) {
    setFieldState(password, passwordError, 'Password is required.');
  } else if (!isPasswordStrong(password.value)) {
    setFieldState(password, passwordError, 'Password must be at least 8 characters, include uppercase, lowercase, digit & special character.');
  } else {
    setFieldState(password, passwordError, '');
  }
  // Validate confirm password if not empty
  if (confirmPassword.value) {
    confirmPassword.dispatchEvent(new Event('input'));
  }
});

confirmPassword.addEventListener('input', () => {
  if (!confirmPassword.value) {
    setFieldState(confirmPassword, confirmPasswordError, 'Please confirm your password.');
  } else if (confirmPassword.value !== password.value) {
    setFieldState(confirmPassword, confirmPasswordError, 'Passwords do not match.');
  } else {
    setFieldState(confirmPassword, confirmPasswordError, '');
  }
});

// Submit handler
form.addEventListener('submit', function (e) {
  e.preventDefault();
  let valid = true;

  // Trigger all validations
  username.dispatchEvent(new Event('input'));
  email.dispatchEvent(new Event('input'));
  password.dispatchEvent(new Event('input'));
  confirmPassword.dispatchEvent(new Event('input'));

  // Check for errors
  if (usernameError.textContent || emailError.textContent || passwordError.textContent || confirmPasswordError.textContent) {
    valid = false;
  }

  if (valid) {
    successMessage.style.display = 'block';
    successMessage.textContent = 'Registration Successful!';
    form.reset();
    // Remove valid classes
    [username, email, password, confirmPassword].forEach(input => input.classList.remove('valid'));
    setTimeout(() => {
      successMessage.style.display = 'none';
    }, 3500);
  } else {
    successMessage.style.display = 'none';
  }
});
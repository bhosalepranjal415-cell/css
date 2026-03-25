// Static credentials (demo purpose only)
const VALID_USER = "admin@example.com";
const VALID_PASS = "Admin@123";

// Attempt control
let failedAttempts = 0;
const MAX_ATTEMPTS = 3;
let isLocked = false;

// DOM elements
const form = document.getElementById("loginForm");
const username = document.getElementById("username");
const password = document.getElementById("password");
const message = document.getElementById("message");
const attemptInfo = document.getElementById("attemptInfo");
const loginBtn = document.getElementById("loginBtn");

const userError = document.getElementById("userError");
const passError = document.getElementById("passError");

// Regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (isLocked) return;

    clearErrors();

    let isValid = true;

    // Empty validation
    if (username.value.trim() === "") {
        showError(username, userError, "Username or Email is required");
        isValid = false;
    }

    if (password.value.trim() === "") {
        showError(password, passError, "Password is required");
        isValid = false;
    }

    // Format validation
    if (isValid && !emailRegex.test(username.value.trim())) {
        showError(username, userError, "Invalid email format");
        isValid = false;
    }

    if (isValid && password.value.length < 6) {
        showError(password, passError, "Password must be at least 6 characters");
        isValid = false;
    }

    if (!isValid) return;

    // Credential validation
    if (
        username.value.trim() === VALID_USER &&
        password.value === VALID_PASS
    ) {
        message.textContent = "Login Successful ✔";
        message.style.color = "green";
        failedAttempts = 0;
        attemptInfo.textContent = "";
        form.reset();
    } else {
        failedAttempts++;
        handleFailedAttempt();
    }
});

function handleFailedAttempt() {
    message.textContent = "Invalid credentials";
    message.style.color = "red";

    let remaining = MAX_ATTEMPTS - failedAttempts;
    attemptInfo.textContent = `Remaining attempts: ${remaining}`;

    if (failedAttempts >= MAX_ATTEMPTS) {
        lockLogin();
    }
}

function lockLogin() {
    isLocked = true;
    loginBtn.disabled = true;
    username.disabled = true;
    password.disabled = true;

    message.textContent = "Account locked for 30 seconds";
    attemptInfo.textContent = "";

    setTimeout(() => {
        unlockLogin();
    }, 30000);
}

function unlockLogin() {
    isLocked = false;
    failedAttempts = 0;

    loginBtn.disabled = false;
    username.disabled = false;
    password.disabled = false;

    message.textContent = "";
}

function showError(input, errorElement, msg) {
    input.classList.add("error-border");
    errorElement.textContent = msg;
}

function clearErrors() {
    userError.textContent = "";
    passError.textContent = "";
    username.classList.remove("error-border");
    password.classList.remove("error-border");
}

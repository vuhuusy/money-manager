export const validateEmail = (email) => {
    if (!email.trim()) return "Email is required.";
    const emailRegex = /^[a-zA-Z0-9]([a-zA-Z0-9._%+-]*[a-zA-Z0-9])?@[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?(\.[a-zA-Z0-9]([a-zA-Z0-9-]*[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email) || email.includes("..")) return "Please enter a valid email address (e.g. example@mail.com).";
    return null;
}

export const validatePassword = (password) => {
    if (!password.trim()) return "Password is required.";
    const isValid =
        password.length >= 8 &&
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        /[0-9]/.test(password) &&
        /[!@#$%^&*(),.?":{}|<>]/.test(password);
    if (!isValid) return "Password must be at least 8 characters and contain an uppercase letter, a lowercase letter, a number, and a special character.";
    return null;
}

export const validateFullName = (fullName) => {
    if (!fullName.trim()) return "Full name is required.";
    const trimmed = fullName.trim();
    const isValid = trimmed.length >= 2 && trimmed.length <= 50 && /^[\p{L} '-]+$/u.test(trimmed);
    if (!isValid) return "Full Name must be 2–100 characters and contain only letters, spaces, hyphens, and apostrophes.";
    return null;
}
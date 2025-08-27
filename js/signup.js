document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("signupForm");
  const message = document.getElementById("signupMessage");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form input values
    const fullName = document.getElementById("fullName").value.trim();
    const email = document.getElementById("email").value.trim();
    const username = document.getElementById("newUsername").value.trim();
    const password = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // Validation: All fields required
    if (!fullName || !email || !username || !password || !confirmPassword) {
      message.innerHTML = '<span style="color:red;">❌ All fields are required!</span>';
      return;
    }

    // Validation: Passwords must match
    if (password !== confirmPassword) {
      message.innerHTML = '<span style="color:red;">❌ Passwords do not match!</span>';
      return;
    }

    // Load users from storage, clean invalid entries
    let users = JSON.parse(localStorage.getItem("users") || "[]");
    if (!Array.isArray(users)) users = [];
    users = users.filter(u => u.username && u.username.trim() !== "");

    // Check for duplicate username (case-insensitive)
    if (users.some(u => u.username.trim().toLowerCase() === username.toLowerCase())) {
      message.innerHTML = '<span style="color:red;">❌ Username already exists!</span>';
      return;
    }

    // Save new user
    users.push({ fullName, email, username, password });
    localStorage.setItem("users", JSON.stringify(users));

    // Success feedback
    message.innerHTML = '<span style="color:green;">✅ Account created successfully!</span>';
    form.reset();

    // Redirect after 1.5 seconds
    setTimeout(() => {
      window.location.href = "login.html";
    }, 1500);
  });
});

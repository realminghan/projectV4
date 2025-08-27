document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("loginForm");
  const message = document.getElementById("loginMessage");
  const rememberMe = document.getElementById("rememberMe");

  // Helper function to set cookie
  function setCookie(name, value, days = 1) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/`;
  }

  // Autofill if "Remember Me" was checked
  const savedUser = JSON.parse(localStorage.getItem("rememberedUser"));
  if (savedUser) {
    document.getElementById("username").value = savedUser.username;
    document.getElementById("password").value = savedUser.password;
    rememberMe.checked = true;
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Find matching user
    const foundUser = users.find(
      (u) => u.username === username && u.password === password
    );

    if (foundUser) {
      // SET LOGIN STATE - This is what was missing!
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("currentUser", JSON.stringify({
        username: foundUser.username
      }));
      
      // Also set cookies for auth.js
      setCookie("isLoggedIn", "true");
      setCookie("currentUser", JSON.stringify({
        username: foundUser.username
      }));
      setCookie("loginTime", new Date().toISOString());

      if (rememberMe.checked) {
        localStorage.setItem("rememberedUser", JSON.stringify({ username, password }));
      } else {
        localStorage.removeItem("rememberedUser");
      }

      message.innerHTML = '<span style="color:green;">✅ Login successful! Redirecting...</span>';
      
      setTimeout(() => {
        window.location.href = "mainpage.html";
      }, 1500);
    } else {
      message.innerHTML = '<span style="color:red;">❌ Invalid username or password.</span>';
    }
  });
});
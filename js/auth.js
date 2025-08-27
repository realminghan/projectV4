(function() {
  'use strict';

  function setCookie(name, value, days = 1) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/`;
  }

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return decodeURIComponent(parts.pop().split(';').shift());
    }
    return null;
  }

  function deleteCookie(name) {
    document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/`;
  }

  function isLoggedIn() {
    const cookieLogin = getCookie("isLoggedIn") === "true";
    const localLogin = localStorage.getItem("isLoggedIn") === "true";
    return cookieLogin || localLogin;
  }

  function getCurrentUser() {
    let user = getCookie("currentUser");
    if (!user) {
      user = localStorage.getItem("currentUser");
    }
    try {
      return user ? JSON.parse(user) : null;
    } catch (e) {
      return null;
    }
  }

  function performLogout() {
    deleteCookie("isLoggedIn");
    deleteCookie("currentUser");
    deleteCookie("loginTime");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("rememberedUser");
    updateNavbar();
    showMessage("Logged out successfully!", "success");
    setTimeout(() => {
      if (window.location.pathname.includes('/html/')) {
        window.location.href = "../html/mainpage.html";
      } else {
        window.location.href = "mainpage.html";
      }
    }, 1000);
  }

  function updateNavbar() {
    const loggedIn = isLoggedIn();
    let loginLink = null;
    const selectors = [
      'a[href="../html/login.html"]',
      'a[href="login.html"]', 
      'a[href="./login.html"]',
      'a[href*="login.html"]'
    ];
    for (const selector of selectors) {
      loginLink = document.querySelector(selector);
      if (loginLink) break;
    }
    if (!loginLink) {
      const allNavLinks = document.querySelectorAll('.nav-link, .navbar-nav a, nav a');
      for (const link of allNavLinks) {
        const text = link.textContent.trim().toLowerCase();
        if (text === 'login' || text === 'logout') {
          loginLink = link;
          break;
        }
      }
    }
    if (loginLink) {
      if (loggedIn) {
        loginLink.textContent = "Logout";
        loginLink.href = "#";
        loginLink.style.display = "";
        loginLink.style.visibility = "visible";
        loginLink.style.opacity = "1";
        loginLink.onclick = function(e) {
          e.preventDefault();
          if (confirm("Are you sure you want to logout?")) {
            performLogout();
          }
          return false;
        };
      } else {
        loginLink.textContent = "Login";
        loginLink.onclick = null;
        loginLink.style.display = "";
        loginLink.style.visibility = "visible";
        loginLink.style.opacity = "1";
        if (window.location.pathname.includes('/html/')) {
          loginLink.href = "../html/login.html";
        } else {
          loginLink.href = "login.html";
        }
      }
    }
  }

  function showMessage(message, type = "info") {
    const existingMessages = document.querySelectorAll('.auth-message');
    existingMessages.forEach(msg => msg.remove());
    const messageDiv = document.createElement("div");
    messageDiv.className = "auth-message";
    messageDiv.style.cssText = `
      position: fixed;
      top: 100px;
      right: 20px;
      padding: 15px 20px;
      border-radius: 5px;
      color: white;
      font-weight: bold;
      z-index: 9999;
      max-width: 300px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    `;
    switch(type) {
      case "success":
        messageDiv.style.backgroundColor = "#28a745";
        break;
      case "error":
        messageDiv.style.backgroundColor = "#dc3545";
        break;
      default:
        messageDiv.style.backgroundColor = "#17a2b8";
    }
    messageDiv.textContent = message;
    document.body.appendChild(messageDiv);
    setTimeout(() => {
      if (document.body.contains(messageDiv)) {
        document.body.removeChild(messageDiv);
      }
    }, 3000);
  }

  function immediateUpdate() {
    if (document.readyState === 'loading') {
      setTimeout(immediateUpdate, 10);
      return;
    }
    updateNavbar();
  }

  immediateUpdate();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateNavbar);
  } else {
    updateNavbar();
  }

  window.addEventListener('load', updateNavbar);

  let lastLoginState = isLoggedIn();
  setInterval(() => {
    const currentLoginState = isLoggedIn();
    if (currentLoginState !== lastLoginState) {
      lastLoginState = currentLoginState;
      updateNavbar();
    }
  }, 1000);

  window.isLoggedIn = isLoggedIn;
  window.getCurrentUser = getCurrentUser;
  window.updateNavbar = updateNavbar;
  window.performLogout = performLogout;

})();

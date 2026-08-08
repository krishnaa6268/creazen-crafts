/* ---------------------------------------------
   Creazen Crafts - Authentication & User State Engine
--------------------------------------------- */

(function () {
  'use strict';

  const AUTH_USER_KEY = 'creazen_current_user';
  const USERS_DB_KEY = 'creazen_registered_users';

  class AuthEngine {
    constructor() {
      this.initDemoUsers();
      this.currentUser = this.loadCurrentUser();
      this.initHeaderAuthUI();
    }

    initDemoUsers() {
      if (!localStorage.getItem(USERS_DB_KEY)) {
        const demoUsers = [
          {
            name: 'Ananya Sharma',
            email: 'user@creazen.com',
            password: 'password123',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ananya'
          }
        ];
        localStorage.setItem(USERS_DB_KEY, JSON.stringify(demoUsers));
      }
    }

    getRegisteredUsers() {
      try {
        const stored = localStorage.getItem(USERS_DB_KEY);
        return stored ? JSON.parse(stored) : [];
      } catch (e) {
        return [];
      }
    }

    loadCurrentUser() {
      try {
        const stored = localStorage.getItem(AUTH_USER_KEY);
        return stored ? JSON.parse(stored) : null;
      } catch (e) {
        return null;
      }
    }

    login(email, password) {
      const users = this.getRegisteredUsers();
      const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === password);

      if (user) {
        this.currentUser = { name: user.name, email: user.email, avatar: user.avatar };
        localStorage.setItem(AUTH_USER_KEY, JSON.stringify(this.currentUser));
        this.updateHeaderAuthUI();
        if (window.CreazenCart) {
          window.CreazenCart.showToast(`Welcome back, ${user.name}! 👋`, 'success');
        }
        return { success: true };
      } else {
        return { success: false, message: 'Invalid email address or password.' };
      }
    }

    signup(name, email, password) {
      const users = this.getRegisteredUsers();
      const existing = users.find(u => u.email.toLowerCase() === email.toLowerCase());

      if (existing) {
        return { success: false, message: 'An account with this email already exists.' };
      }

      const newUser = {
        name: name,
        email: email,
        password: password,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(name)}`
      };

      users.push(newUser);
      localStorage.setItem(USERS_DB_KEY, JSON.stringify(users));

      // Auto login after signup
      this.currentUser = { name: newUser.name, email: newUser.email, avatar: newUser.avatar };
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(this.currentUser));
      this.updateHeaderAuthUI();

      if (window.CreazenCart) {
        window.CreazenCart.showToast(`Welcome to Creazen Crafts, ${newUser.name}! 🎉`, 'success');
      }

      return { success: true };
    }

    logout() {
      this.currentUser = null;
      localStorage.removeItem(AUTH_USER_KEY);
      this.updateHeaderAuthUI();
      if (window.CreazenCart) {
        window.CreazenCart.showToast('You have been logged out.', 'info');
      }
    }

    initHeaderAuthUI() {
      document.addEventListener('DOMContentLoaded', () => {
        this.updateHeaderAuthUI();
      });
    }

    updateHeaderAuthUI() {
      const toggleContainers = document.querySelectorAll('.toggle-container');
      const drawerCards = document.querySelectorAll('.drawer-user-profile-card');
      const isSubDir = window.location.pathname.includes('/src/');
      const loginPath = isSubDir ? './login.html' : './src/login.html';
      const signupPath = isSubDir ? './signup.html' : './src/signup.html';

      if (this.currentUser) {
        const initial = this.currentUser.name.charAt(0).toUpperCase();

        // Render Header Dropdown
        toggleContainers.forEach(container => {
          container.innerHTML = `
            <div class="user-profile-dropdown">
              <button class="user-profile-btn" aria-label="User Profile Menu">
                <span class="user-avatar-initial">${initial}</span>
                <span class="user-name-text">${this.currentUser.name.split(' ')[0]}</span>
                <i class="fa-solid fa-chevron-down"></i>
              </button>
              <div class="user-dropdown-menu">
                <div class="user-menu-header">
                  <strong>${this.currentUser.name}</strong>
                  <span>${this.currentUser.email}</span>
                </div>
                <hr>
                <a href="#" onclick="window.CreazenCart.openDrawer(); return false;"><i class="fa-solid fa-bag-shopping"></i> My Orders</a>
                <a href="#" class="btn-logout-action"><i class="fa-solid fa-right-from-bracket"></i> Sign Out</a>
              </div>
            </div>
          `;
        });

        // Render Mobile Sidebar Drawer Static Profile Card
        drawerCards.forEach(card => {
          card.innerHTML = `
            <div class="mobile-sidebar-profile-card">
              <div class="card-avatar">${initial}</div>
              <div class="card-details">
                <strong class="card-name">${this.currentUser.name}</strong>
                <span class="card-email">${this.currentUser.email}</span>
              </div>
              <button class="card-logout-btn btn-logout-action" aria-label="Log Out">
                <i class="fa-solid fa-right-from-bracket"></i>
              </button>
            </div>
          `;
        });

        // Attach listeners to logout buttons & dropdown triggers
        document.querySelectorAll('.btn-logout-action').forEach(btn => {
          btn.addEventListener('click', (e) => {
            e.preventDefault();
            this.logout();
          });
        });

        document.querySelectorAll('.user-profile-btn').forEach(btn => {
          btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const menu = btn.nextElementSibling;
            if (menu) menu.classList.toggle('active');
          });
        });

        document.addEventListener('click', () => {
          document.querySelectorAll('.user-dropdown-menu').forEach(m => m.classList.remove('active'));
        });

      } else {
        toggleContainers.forEach(container => {
          container.innerHTML = `
            <div class="toggle-bar">
              <a href="${loginPath}" class="log-in">Log in</a>
              <a href="${signupPath}" class="sign-up active">Sign up</a>
            </div>
          `;
        });

        drawerCards.forEach(card => {
          card.innerHTML = `
            <div class="mobile-drawer-auth-buttons">
              <a href="${loginPath}" class="btn btn-outline btn-sm">Log in</a>
              <a href="${signupPath}" class="btn btn-primary btn-sm">Sign up</a>
            </div>
          `;
        });
      }
    }
  }

  window.CreazenAuth = new AuthEngine();
})();

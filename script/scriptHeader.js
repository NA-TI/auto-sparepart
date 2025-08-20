// Ultra Modern Header Script with Enhanced Interactions

// DOM Elements
const login = document.querySelector(".login");
const signup = document.querySelector(".signup");
const loginPage = document.querySelector(".login_page");
const signupPage = document.querySelector(".signup_page");
const register_bg = document.querySelector(".register_bg");
const close_register = register_bg.querySelector("img");
const toLogin = document.querySelector(".switch-to-login");
const toSignup = document.querySelector(".switch-to-signup");

// Form elements for validation
const loginForm = loginPage.querySelector("form");
const signupForm = signupPage.querySelector("form");

// Enhanced Modal Management
class ModalManager {
  constructor() {
    this.isOpen = false;
    this.currentModal = null;
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Login button
    login.addEventListener("click", () => {
      this.openModal(loginPage);
    });

    // Signup button
    signup.addEventListener("click", () => {
      this.openModal(signupPage);
    });

    // Close button
    close_register.addEventListener("click", () => {
      this.closeModal();
    });

    // Background click to close
    register_bg.addEventListener("click", (e) => {
      if (e.target === register_bg) {
        this.closeModal();
      }
    });

    // Switch between modals
    toLogin.addEventListener("click", () => {
      this.switchModal(signupPage, loginPage);
    });

    toSignup.addEventListener("click", () => {
      this.switchModal(loginPage, signupPage);
    });

    // Keyboard support
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.isOpen) {
        this.closeModal();
      }
    });

    // Form submissions
    loginForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleLogin();
    });

    signupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      this.handleSignup();
    });
  }

  openModal(modal) {
    this.isOpen = true;
    this.currentModal = modal;

    // Add active classes with staggered animation
    register_bg.classList.add("active");

    setTimeout(() => {
      modal.classList.add("active");
    }, 100);

    // Focus management
    setTimeout(() => {
      const firstInput = modal.querySelector("input");
      if (firstInput) firstInput.focus();
    }, 300);

    // Prevent body scroll
    document.body.style.overflow = "hidden";
  }

  closeModal() {
    this.isOpen = false;

    // Remove active classes
    register_bg.classList.remove("active");
    loginPage.classList.remove("active");
    signupPage.classList.remove("active");

    this.currentModal = null;

    // Restore body scroll
    document.body.style.overflow = "";
  }

  switchModal(fromModal, toModal) {
    fromModal.classList.remove("active");

    setTimeout(() => {
      toModal.classList.add("active");
      this.currentModal = toModal;

      // Focus first input in new modal
      const firstInput = toModal.querySelector("input");
      if (firstInput) firstInput.focus();
    }, 200);
  }

  async handleLogin() {
    const email = loginForm.querySelector("#email").value;
    const password = loginForm.querySelector("#password").value;

    if (!this.validateForm(loginForm)) {
      return;
    }

    // Show loading state
    const submitBtn = loginForm.querySelector('input[type="submit"]');
    const originalText = submitBtn.value;
    submitBtn.value = "Signing In...";
    submitBtn.disabled = true;

    try {
      // Simulate API call
      await this.simulateApiCall();

      // Success animation
      this.showSuccessMessage("Login successful!");

      // Close modal after delay
      setTimeout(() => {
        this.closeModal();
        this.resetForm(loginForm);
      }, 1500);
    } catch (error) {
      this.showErrorMessage("Login failed. Please try again.");
    } finally {
      submitBtn.value = originalText;
      submitBtn.disabled = false;
    }
  }

  async handleSignup() {
    const name = signupForm.querySelector("#name").value;
    const email = signupForm.querySelector("#newEmail").value;
    const password = signupForm.querySelector("#newPassword").value;

    if (!this.validateForm(signupForm)) {
      return;
    }

    // Show loading state
    const submitBtn = signupForm.querySelector('input[type="submit"]');
    const originalText = submitBtn.value;
    submitBtn.value = "Creating Account...";
    submitBtn.disabled = true;

    try {
      // Simulate API call
      await this.simulateApiCall();

      // Success animation
      this.showSuccessMessage("Account created successfully!");

      // Close modal after delay
      setTimeout(() => {
        this.closeModal();
        this.resetForm(signupForm);
      }, 1500);
    } catch (error) {
      this.showErrorMessage("Signup failed. Please try again.");
    } finally {
      submitBtn.value = originalText;
      submitBtn.disabled = false;
    }
  }

  validateForm(form) {
    const inputs = form.querySelectorAll(
      'input[required], input[type="email"], input[type="password"]'
    );
    let isValid = true;

    inputs.forEach((input) => {
      const errorElement = this.getOrCreateErrorElement(input);

      // Clear previous errors
      input.classList.remove("error");
      errorElement.textContent = "";

      // Email validation
      if (input.type === "email" && input.value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(input.value)) {
          this.showFieldError(input, "Please enter a valid email address");
          isValid = false;
        }
      }

      // Password validation
      if (input.type === "password" && input.value) {
        if (input.value.length < 6) {
          this.showFieldError(input, "Password must be at least 6 characters");
          isValid = false;
        }
      }

      // Required field validation
      if (input.hasAttribute("required") && !input.value.trim()) {
        this.showFieldError(input, "This field is required");
        isValid = false;
      }
    });

    return isValid;
  }

  showFieldError(input, message) {
    input.classList.add("error");
    const errorElement = this.getOrCreateErrorElement(input);
    errorElement.textContent = message;

    // Add shake animation
    input.style.animation = "shake 0.5s ease-in-out";
    setTimeout(() => {
      input.style.animation = "";
    }, 500);
  }

  getOrCreateErrorElement(input) {
    let errorElement = input.parentNode.querySelector(".error-message");
    if (!errorElement) {
      errorElement = document.createElement("div");
      errorElement.className = "error-message";
      errorElement.style.cssText = `
        color: var(--error);
        font-size: 0.75rem;
        margin-top: 0.25rem;
        animation: slideDown 0.3s ease-out;
      `;
      input.parentNode.appendChild(errorElement);
    }
    return errorElement;
  }

  showSuccessMessage(message) {
    this.showMessage(message, "success");
  }

  showErrorMessage(message) {
    this.showMessage(message, "error");
  }

  showMessage(message, type) {
    const messageDiv = document.createElement("div");
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
      position: fixed;
      top: 2rem;
      right: 2rem;
      padding: 1rem 1.5rem;
      border-radius: var(--radius-lg);
      color: var(--white);
      font-weight: 600;
      z-index: 3000;
      animation: slideInRight 0.3s ease-out;
      background: ${type === "success" ? "var(--success)" : "var(--error)"};
      box-shadow: var(--shadow-lg);
    `;

    document.body.appendChild(messageDiv);

    // Auto remove after 3 seconds
    setTimeout(() => {
      messageDiv.style.animation = "slideOutRight 0.3s ease-out";
      setTimeout(() => {
        document.body.removeChild(messageDiv);
      }, 300);
    }, 3000);
  }

  resetForm(form) {
    form.reset();
    const errorMessages = form.querySelectorAll(".error-message");
    errorMessages.forEach((msg) => msg.remove());
    const errorInputs = form.querySelectorAll(".error");
    errorInputs.forEach((input) => input.classList.remove("error"));
  }

  async simulateApiCall() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate 90% success rate
        if (Math.random() > 0.1) {
          resolve();
        } else {
          reject(new Error("Network error"));
        }
      }, 1500);
    });
  }
}

// Enhanced Navigation Tabs
class NavigationManager {
  constructor() {
    this.tabs = document.querySelectorAll(".tabs li");
    this.setupTabInteractions();
  }

  setupTabInteractions() {
    this.tabs.forEach((tab) => {
      tab.addEventListener("click", (e) => {
        e.preventDefault();
        this.setActiveTab(tab);
      });

      // Add hover effects
      tab.addEventListener("mouseenter", () => {
        if (!tab.classList.contains("active")) {
          tab.style.transform = "translateY(-2px)";
        }
      });

      tab.addEventListener("mouseleave", () => {
        if (!tab.classList.contains("active")) {
          tab.style.transform = "translateY(0)";
        }
      });
    });
  }

  setActiveTab(activeTab) {
    this.tabs.forEach((tab) => {
      tab.classList.remove("active");
    });
    activeTab.classList.add("active");
  }
}

// Enhanced Button Interactions
class ButtonManager {
  constructor() {
    this.setupButtonEffects();
  }

  setupButtonEffects() {
    const buttons = document.querySelectorAll("button, .buttons a");

    buttons.forEach((button) => {
      button.addEventListener("mousedown", () => {
        button.style.transform = "scale(0.95)";
      });

      button.addEventListener("mouseup", () => {
        button.style.transform = "";
      });

      button.addEventListener("mouseleave", () => {
        button.style.transform = "";
      });
    });
  }
}

// Initialize all managers when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new ModalManager();
  new NavigationManager();
  new ButtonManager();

  // Add CSS animations
  const style = document.createElement("style");
  style.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      25% { transform: translateX(-5px); }
      75% { transform: translateX(5px); }
    }

    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes slideInRight {
      from {
        opacity: 0;
        transform: translateX(100%);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes slideOutRight {
      from {
        opacity: 1;
        transform: translateX(0);
      }
      to {
        opacity: 0;
        transform: translateX(100%);
      }
    }

    .error {
      border-color: var(--error) !important;
      box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1) !important;
    }

    input:disabled {
      opacity: 0.7;
      cursor: not-allowed;
    }
  `;
  document.head.appendChild(style);
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Navigation functionality
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".tabs a");
  const sections = document.querySelectorAll("section[id]");

  // Smooth scrolling for navigation links
  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");

      // Allow normal navigation for external pages and HTML files
      if (!href || href.startsWith("http") || href.includes(".html")) {
        // Don't prevent default for HTML files - let them navigate normally
        return;
      }

      e.preventDefault();

      // Remove hash if present
      const targetId = href.replace("#", "");
      const targetSection = document.getElementById(targetId);

      if (targetSection) {
        // Smooth scroll to target section
        targetSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });

        // Update active navigation state
        updateActiveNav(href);
      }
    });
  });

  // Update active navigation based on scroll position
  function updateActiveNav(href) {
    navLinks.forEach((link) => {
      link.parentElement.classList.remove("active");
    });

    const activeLink = document.querySelector(`a[href="${href}"]`);
    if (activeLink) {
      activeLink.parentElement.classList.add("active");
    }
  }

  // Intersection Observer to update active nav on scroll
  const observerOptions = {
    threshold: 0.3,
    rootMargin: "-20% 0px -20% 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const sectionId = entry.target.id;
        if (sectionId) {
          updateActiveNav(`#${sectionId}`);
        }
      }
    });
  }, observerOptions);

  // Observe sections for scroll-based navigation updates
  sections.forEach((section) => {
    observer.observe(section);
  });

  // Handle home link (scroll to top)
  const homeLink = document.querySelector('.tabs a[href=""]');
  if (homeLink) {
    homeLink.addEventListener("click", function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      updateActiveNav("");
    });
  }
});

// Existing header functionality
document.addEventListener("DOMContentLoaded", function () {
  const loginBtn = document.querySelector(".login");
  const signupBtn = document.querySelector(".signup");
  const registerBg = document.querySelector(".register_bg");
  const switchToLogin = document.querySelector(".switch-to-login");
  const switchToSignup = document.querySelector(".switch-to-signup");
  const cancelBtn = document.querySelector(".register_bg img");

  // Show login/signup forms
  function showForm(formType) {
    registerBg.style.display = "flex";
    if (formType === "login") {
      registerBg.classList.add("show-login");
      registerBg.classList.remove("show-signup");
    } else {
      registerBg.classList.add("show-signup");
      registerBg.classList.remove("show-login");
    }
  }

  // Hide forms
  function hideForm() {
    registerBg.style.display = "none";
    registerBg.classList.remove("show-login", "show-signup");
  }

  // Event listeners
  if (loginBtn) {
    loginBtn.addEventListener("click", () => showForm("login"));
  }

  if (signupBtn) {
    signupBtn.addEventListener("click", () => showForm("signup"));
  }

  if (switchToLogin) {
    switchToLogin.addEventListener("click", () => showForm("login"));
  }

  if (switchToSignup) {
    switchToSignup.addEventListener("click", () => showForm("signup"));
  }

  if (cancelBtn) {
    cancelBtn.addEventListener("click", hideForm);
  }

  // Close form when clicking outside
  if (registerBg) {
    registerBg.addEventListener("click", function (e) {
      if (e.target === registerBg) {
        hideForm();
      }
    });
  }
});

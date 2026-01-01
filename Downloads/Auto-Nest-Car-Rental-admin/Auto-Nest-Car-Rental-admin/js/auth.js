/* =====================================
   Auto Nest Admin – Simple Auth
   Uses localStorage only
===================================== */

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");

    // If already logged in → go to dashboard
    if (loginForm && isLoggedIn()) {
        window.location.href = "dashboard.html";
        return;
    }

    if (loginForm) initLogin();
});

/* -------------------------------
   LOGIN HANDLER
-------------------------------- */
function initLogin() {
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const errorAlert = document.getElementById("errorAlert");
    const errorMessage = document.getElementById("errorMessage");
    const togglePassword = document.getElementById("togglePassword");

    // Toggle password visibility
    if (togglePassword) {
        togglePassword.addEventListener("click", () => {
            password.type = password.type === "password" ? "text" : "password";
        });
    }

    // Form submit
    document.getElementById("loginForm").addEventListener("submit", (e) => {
        e.preventDefault();

        hideError();

        // Demo credentials
        if (
            email.value === "admin@autonest.com" &&
            password.value === "admin123"
        ) {
            const user = {
                name: "Admin User",
                email: email.value,
                role: "admin",
                loginTime: Date.now()
            };

            localStorage.setItem("autonest_logged_in", "true");
            localStorage.setItem("autonest_user", JSON.stringify(user));

            window.location.href = "dashboard.html";
        } else {
            showError("Invalid email or password");
        }
    });

    function showError(msg) {
        errorMessage.textContent = msg;
        errorAlert.style.display = "flex";
    }

    function hideError() {
        errorAlert.style.display = "none";
    }
}

/* -------------------------------
   LOGIN CHECK
-------------------------------- */
function isLoggedIn() {
    return localStorage.getItem("autonest_logged_in") === "true";
}

/* =====================================================
   DASHBOARD PAGE SCRIPT (use same file)
===================================================== */

if (document.body.classList.contains("admin-page")) {
    if (!isLoggedIn()) {
        window.location.href = "login.html";
    } else {
        loadAdminData();
        setupLogout();
    }
}

/* -------------------------------
   LOAD ADMIN INFO
-------------------------------- */
function loadAdminData() {
    const user = JSON.parse(localStorage.getItem("autonest_user"));
    if (!user) return;

    const nameEl = document.getElementById("admin-name");
    const emailEl = document.getElementById("admin-email");

    if (nameEl) nameEl.textContent = user.name;
    if (emailEl) emailEl.textContent = user.email;
}

/* -------------------------------
   LOGOUT
-------------------------------- */
function setupLogout() {
    const logoutBtn = document.getElementById("logoutBtn");

    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("autonest_logged_in");
            localStorage.removeItem("autonest_user");
            window.location.href = "login.html";
        });
    }
}

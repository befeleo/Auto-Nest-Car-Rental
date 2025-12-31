let inventory = [];

document.addEventListener('DOMContentLoaded', () => {

    const savedData = localStorage.getItem('autoNestCars');
    if (savedData) {
        inventory = JSON.parse(savedData);
        renderTable();
    }

    const form = document.getElementById('add-car-form');
    form.addEventListener('submit', () => {

        const brand = document.getElementById('brand').value;
        const name = document.getElementById('name').value;
        const price = document.getElementById('price').value;
        const fuelType = document.getElementById('fuelType').value;
        const bodyType = document.getElementById('bodyType').value;
        const transmission = document.getElementById('transmission').value;
        const isUsed = document.getElementById('isUsed').checked;
        const isPopular = document.getElementById('isPopular').checked;
        const isLuxury = document.getElementById('isLuxury').checked;
        const featuresInput = document.getElementById('features').value;

        const newCar = {
            brand: brand,
            name: name,
            price: price,
            fuelType: fuelType,
            bodyType: bodyType,
            transmission: transmission,
            isUsed: isUsed,
            isPopular: isPopular,
            isLuxury: isLuxury,
        };

        inventory.push(newCar);
        save();
    });
});

function renderTable() {
    const tbody = document.getElementById('admin-car-list');
    if (!tbody) return;

    tbody.innerHTML = inventory.map(car => `
        <tr>
            <td><strong>${car.brand}</strong> ${car.name}</td>
            <td>${car.price.toLocaleString()} Birr</td>
            <td>${car.bodyType}</td>
            <td>
                <button>Delete</button>
            </td>
        </tr>
    `).join('');
}

function save() {
    localStorage.setItem('autoNestCars', JSON.stringify(inventory));
    renderTable();
}

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. NAVIGATION LOGIC ---
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.content-section');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = link.getAttribute('data-section');

            // Toggle active class on sidebar
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Hide all sections and show the target one
            sections.forEach(sec => sec.style.display = 'none');

            const targetID = `${target}-section`;
            const targetElement = document.getElementById(targetID);
            if (targetElement) {
                targetElement.style.display = 'block';

                // If the user clicks Settings, load their data
                if (target === 'settings') {
                    loadAdminData();
                }
            }
        });
    });

    // --- 2. SETTINGS UI ACTIONS ---
    const btnChangePass = document.getElementById('btn-change-pass');
    const newPassFields = document.getElementById('new-password-fields');

    if (btnChangePass) {
        btnChangePass.addEventListener('click', () => {
            const isHidden = newPassFields.style.display === 'none';
            newPassFields.style.display = isHidden ? 'block' : 'none';
            btnChangePass.textContent = isHidden ? 'Cancel' : 'Change';
        });
    }

    // --- 3. DATA PERSISTENCE ---
    const btnSave = document.getElementById('btn-save-settings');
    if (btnSave) btnSave.addEventListener('click', saveAdminData);

    const logoutBtn = document.getElementById('btn-settings-logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            if (confirm("Logout from Admin Panel?")) window.location.href = 'login.html';
        });
    }
});

/**
 * Loads data from LocalStorage and populates the Settings fields
 */
function loadAdminData() {
    const savedUser = JSON.parse(localStorage.getItem('currentUser')) || {
        name: "Admin User",
        email: "admin@autonest.com",
        preferences: { notifications: true, maintenance: false, alerts: true },
        currency: "ETB"
    };

    document.getElementById('admin-name').value = savedUser.name;
    document.getElementById('admin-email').value = savedUser.email;
    document.getElementById('pref-notifications').checked = savedUser.preferences.notifications;
    document.getElementById('pref-maintenance').checked = savedUser.preferences.maintenance;
    document.getElementById('pref-alerts').checked = savedUser.preferences.alerts;
    document.getElementById('currency-select').value = savedUser.currency;
}

/**
 * Saves all current Settings inputs into LocalStorage
 */
function saveAdminData() {
    const updatedUser = {
        name: document.getElementById('admin-name').value,
        email: document.getElementById('admin-email').value,
        currency: document.getElementById('currency-select').value,
        preferences: {
            notifications: document.getElementById('pref-notifications').checked,
            maintenance: document.getElementById('pref-maintenance').checked,
            alerts: document.getElementById('pref-alerts').checked
        }
    };

    const newPass = document.getElementById('new-pass').value;
    if (newPass.trim() !== "") {
        updatedUser.password = newPass; // In a real app, you'd hash this!
    }

    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    alert("Settings updated successfully!");
}
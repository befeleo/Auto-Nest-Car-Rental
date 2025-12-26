// --- 1. UI Logic (Tabs & Toggle) ---
const toggleBtn = document.getElementById('toggleBtn');
const moreBrands = document.getElementById('more-brands');
const tabLinks = document.querySelectorAll('.tab-link a');
const tabPanels = document.querySelectorAll('.tab-panel');

toggleBtn?.addEventListener('click', () => {
    moreBrands.style.display = (moreBrands.style.display === 'grid') ? 'none' : 'grid';
});

tabLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        tabLinks.forEach(tabLink => tabLink.parentElement.classList.remove('active'));
        tabPanels.forEach(panel => panel.style.display = 'none');
        link.parentElement.classList.add('active');
        const tabId = link.className; // Uses the class name as the ID
        const targetPanel = document.getElementById(tabId);
        if (targetPanel) targetPanel.style.display = 'block';
    });
});

const redirectToFilter = (value) => {
    if (!value) return;
    window.location.href = `services.html?brand=${encodeURIComponent(value)}`;
};

const brandCard = document.querySelectorAll('.brand-card');

brandCard.forEach(brand => {
    brand.addEventListener('click', () => {
        const brandName = brand.getAttribute('data-brand')

        redirectToFilter(brandName);
    });
});


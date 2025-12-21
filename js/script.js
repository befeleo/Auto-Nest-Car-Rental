const toggleBtn = document.getElementById('toggleBtn');
const moreBrands = document.getElementById('moreBrands');
const tabLinks = document.querySelectorAll('.tab-link a');
const tabPanels = document.querySelectorAll('.tab-panel');

toggleBtn.addEventListener('click', () => {
    moreBrands.style.display = (moreBrands.style.display === 'grid') ? 'none' : 'grid';
});

tabLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
        e.preventDefault();

        tabLinks.forEach(tabLink => tabLink.parentElement.classList.remove('active'));
        tabPanels.forEach(panel => panel.style.display = 'none');

        link.parentElement.classList.add('active');

        const tabId = link.classList[0];
        const targetPanel = document.getElementById(tabId);

        if (targetPanel) {
            targetPanel.style.display = 'block';
        }
    });
});
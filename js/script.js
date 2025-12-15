const toggleBtn = document.getElementById('toggleBtn');
const moreBrands = document.getElementById('moreBrands');
const tabLinks = document.querySelectorAll('.tab-link a');
const tabPanels = document.querySelectorAll('.tab-panel');

toggleBtn.addEventListener('click', () => {
    if (moreBrands.style.display === 'grid') {
        moreBrands.style.display = 'none'
    } else {
        moreBrands.style.display = 'grid';
    }
});

tabLinks.forEach((link) => {
    link.addEventListener('click', () => {
        tabLinks.forEach(tabLink => tabLink.classList.remove('active'));
        tabPanels.forEach(panel => panel.style.display = 'none');

        link.classList.add('active');;

        const tabId = link.classList[0];
        const targetPanel = document.getElementById(tabId);

        if (targetPanel)
            targetPanel.style.display = 'block';
    });
});

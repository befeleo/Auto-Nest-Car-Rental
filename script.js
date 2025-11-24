const toggleBtn = document.getElementById('toggleBtn');
const moreBrands = document.getElementById('moreBrands');

toggleBtn.addEventListener('click', () => {
    if (moreBrands.style.display === 'grid') {
        moreBrands.style.display = 'none'
    } else {
        moreBrands.style.display = 'grid';
    }
});
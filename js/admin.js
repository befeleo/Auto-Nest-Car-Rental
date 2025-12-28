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

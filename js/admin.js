let inventory = [];

document.addEventListener('DOMContentLoaded', () => {

    const savedData = localStorage.getItem('autoNestCars');
    if (savedData) {
        inventory = JSON.parse(savedData);
        renderTable();
    }

    const form = document.getElementById('add-car-form');
    const modal = document.getElementById('formModal');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const newCar = {
            id: Date.now(),
            brand: document.getElementById('brand').value,
            name: document.getElementById('name').value,
            price: parseInt(document.getElementById('price').value),
            fuelType: document.getElementById('fuelType').value,
            bodyType: document.getElementById('bodyType').value,
            transmission: document.getElementById('transmission').value,
            isUsed: document.getElementById('isUsed').checked,
            isPopular: document.getElementById('isPopular').checked,
            isLuxury: document.getElementById('isLuxury').checked,
            image: "assets/images/car_images/placeholder.png",
            features: document.getElementById('features').value
                ? document.getElementById('features').value.split(',').map(f => f.trim()) : []
        };

        inventory.push(newCar);
        save();
    });

    document.getElementById('openModalBtn').onclick = () => {
        form.reset();
        document.getElementById('edit-id').value = '';
        document.getElementById('modalTitle').innerText = "Add New Vehicle";
        modal.style.display = 'flex';
    };

    document.getElementById('closeModalBtn').onclick = () => modal.style.display = 'none';
});

const renderTable = () => {
    const tbody = document.getElementById('admin-car-list');
    tbody.innerHTML = inventory.map(car => `
        <tr class="inventory-row">
            <td>#${car.id.toString().slice(-4)}</td>
            <td>${car.brand}</td>
            <td>${car.name}</td>
            <td>${car.bodyType}</td>
            <td class="price-cell">${car.price.toLocaleString()} Birr</td>
            <td>
                <div class="action-buttons">
                    <button class="btn-edit" onclick="editCar(${car.id})">Edit</button>
                    <button class="btn-delete" onclick="deleteCar(${car.id})">Delete</button>
                </div>
            </td>
        </tr>`).join('');
}

const save = () => {
    localStorage.setItem('autoNestCars', JSON.stringify(inventory));
    renderTable();
}

const deleteCar = (id) => {
    inventory = inventory.filter(car => car.id !== id);
    save();
}

window.deleteCar = deleteCar;
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

        const editId = document.getElementById('edit-id').value;

        const newCar = {
            id: editId ? parseInt(editId) : Date.now(),
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
        if (editId) {
            const index = inventory.findIndex(c => c.id === newCar.id);
            if (index !== -1) inventory[index] = newCar;
        } else {
            inventory.push(newCar);
        }

        save();
        modal.style.display = 'none';
        form.reset();
    });

    document.getElementById('openModalBtn').addEventListener('click', () => {
        form.reset();
        document.getElementById('edit-id').value = '';
        document.getElementById('modalTitle').innerText = "Add New Vehicle";
        modal.style.display = 'flex';
    });

    document.getElementById('closeModalBtn').addEventListener('click', () => {
        modal.style.display = 'none';
    });
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

const editCar = (id) => {
    const car = inventory.find(c => c.id === id);
    if (!car) return;

    document.getElementById('modalTitle').innerText = "Edit Vehicle";

    document.getElementById('edit-id').value = car.id;
    document.getElementById('brand').value = car.brand;
    document.getElementById('name').value = car.name;
    document.getElementById('price').value = car.price;
    document.getElementById('fuelType').value = car.fuelType;
    document.getElementById('bodyType').value = car.bodyType;
    document.getElementById('transmission').value = car.transmission;
    document.getElementById('isUsed').checked = car.isUsed;
    document.getElementById('isPopular').checked = car.isPopular;
    document.getElementById('isLuxury').checked = car.isLuxury;
    document.getElementById('features').value = car.features ? car.features.join(', ') : '';
    
    document.getElementById('formModal').style.display = 'flex';
};

window.editCar = editCar;
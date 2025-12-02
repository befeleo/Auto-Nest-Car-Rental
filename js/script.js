// Get elements from HTML
const carListContainer = document.getElementById('car-list'); // Where car cards will show
const carDetailsContainer = document.getElementById('car-details'); // Full details section

// 1. Display Cars List (Short Description)
function displayCars(list = cars) {
  // clear previous content
  carListContainer.innerHTML = '';

  // update results count if present
  const resultCountEl = document.getElementById('result-count');
  if (resultCountEl) resultCountEl.textContent = `${list.length} result${list.length !== 1 ? 's' : ''}`;

  // show a friendly message when no items match
  if (list.length === 0) {
    carListContainer.innerHTML = `<div class="no-results">No cars match your search.</div>`;
    return;
  }

  // render provided list
  list.forEach(car => {
    const carCard = `
      <div class="car-card">
        <img src="${car.image}" alt="${car.name}">
        <h3>${car.name}</h3>
        <p>${car.shortDescription}</p>
        <button onclick="showCarDetails(${car.id})">View Details</button>
      </div>
    `;
    carListContainer.innerHTML += carCard;
  });
}

// Utility: case-insensitive search across many fields
function matchesCar(car, query) {
  if (!query) return true;
  const q = query.toLowerCase();
  const inName = car.name.toLowerCase().includes(q);
  const inShort = car.shortDescription.toLowerCase().includes(q);
  const inFull = car.fullDescription.toLowerCase().includes(q);
  const inPrice = car.price.toLowerCase().includes(q);
  const inFeatures = car.features.join(' ').toLowerCase().includes(q);
  return inName || inShort || inFull || inPrice || inFeatures;
}

// Filter helper
function filterCars(query) {
  return cars.filter(car => matchesCar(car, query));
}

// Debounce helper to avoid firing on every keystroke too quickly
function debounce(fn, wait = 200) {
  let t = null;
  return function(...args) {
    clearTimeout(t);
    t = setTimeout(() => fn.apply(this, args), wait);
  }
}

// Handler for search input
function handleSearchInput(e) {
  const q = e.target.value.trim();
  const results = q ? filterCars(q) : cars;
  displayCars(results);
}

// 2. Show Car Full Details When Clicked
function showCarDetails(carId) {
  const car = cars.find(c => c.id === carId);
  
  carDetailsContainer.innerHTML = `
    <div class="car-details-box">
      <h2>${car.name}</h2>
      <img src="${car.image}" alt="${car.name}">
      <p><strong>Price:</strong> ${car.price}</p>
      <p>${car.fullDescription}</p>

      <h3>Features:</h3>
      <ul>
        ${car.features.map(feature => `<li>${feature}</li>`).join("")}
      </ul>

      <button onclick="closeDetails()">Close</button>
    </div>
  `;

  carDetailsContainer.style.display = 'block'; // Make it visible
}

// 3. Hide the Details Section
function closeDetails() {
  carDetailsContainer.style.display = 'none';
}

// Run the display function when page loads
document.addEventListener('DOMContentLoaded', () => {
  // initial render
  displayCars();

  // attach search behavior if search input exists
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', debounce(handleSearchInput, 180));
  }

  // NAV - mobile toggle
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.querySelector('.main-nav');
  const navList = document.getElementById('navList');

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      mainNav.classList.toggle('nav-open');
    });

    // close the nav when pressing Escape
    document.addEventListener('keydown', (ev) => {
      if (ev.key === 'Escape') {
        mainNav.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });

    // close when clicking a nav link (mobile)
    if (navList) {
      navList.addEventListener('click', (ev) => {
        if (ev.target.matches('a')) {
          mainNav.classList.remove('nav-open');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      });
    }
  }
});
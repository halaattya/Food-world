const select = document.querySelector('#operation');
const btn = document.querySelector('#action-btn');
const form = document.querySelector('#main-form');
const extraControls = document.querySelector('#extra-controls');
const grid = document.querySelector('#food-grid');

// seed data — commented out after first run, data lives in localStorage
/* 
const seedFoods = [
    { name: 'Mediterranean Pasta Salad', cat: 'Seafood', area: 'Italian', image: 'https://www.themealdb.com/images/media/meals/wvqpwt1468339226.jpg', youtube: 'https://www.youtube.com/watch?v=e52IL8zYmaE' },
    { name: 'Spicy Arrabiata Penne', cat: 'Pasta', area: 'Italian', image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg', youtube: 'https://www.youtube.com/watch?v=1IszT_guI08' },
    { name: 'Lamb Tzatziki Burgers', cat: 'Lamb', area: 'Greek', image: 'https://www.themealdb.com/images/media/meals/k420tj1585565244.jpg', youtube: 'https://www.youtube.com/watch?v=s7_TF4ZHjPc' },
    { name: 'Pizza Margherita', cat: 'Miscellaneous', area: 'Italian', image: 'https://www.themealdb.com/images/media/meals/x0lk931587671540.jpg', youtube: 'https://www.youtube.com/watch?v=Mt5lgUZRoUg' },
    { name: 'Pancakes', cat: 'Dessert', area: 'American', image: 'https://www.themealdb.com/images/media/meals/rwuyqx1511383174.jpg', youtube: 'https://www.youtube.com/watch?v=LWuuCndtJr0' },
    { name: 'Chicken Handi', cat: 'Chicken', area: 'Indian', image: 'https://www.themealdb.com/images/media/meals/wyxwsp1486979827.jpg', youtube: 'https://www.youtube.com/watch?v=IO0issT0Rmc' },
];
localStorage.setItem('myData', JSON.stringify(seedFoods));
*/

// load from localStorage (run seed above once to populate)
let foods = JSON.parse(localStorage.getItem('myData')) || [];

renderGrid();

// show action button when operation is selected
select.addEventListener('change', () => {
    const op = select.value;
    extraControls.innerHTML = '';

    if (!op) {
        btn.classList.add('non');
        return;
    }

    btn.classList.remove('non');
    btn.innerText = op.charAt(0).toUpperCase() + op.slice(1);

    if (op === 'delete') {
        extraControls.appendChild(buildFoodSelect('Select food to delete'));
    } else if (op === 'edit') {
        extraControls.appendChild(buildFoodSelect('Select food to edit'));
    }
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const op = select.value;

    if (op === 'add') {
        const newFood = promptFoodInfo();
        if (newFood) {
            foods.push(newFood);
            save();
            location.reload();
        }

    } else if (op === 'delete') {
        const sel = extraControls.querySelector('select');
        if (!sel || !sel.value) return alert('Please select a food to delete.');
        const idx = foods.findIndex(f => f.name === sel.value);
        if (idx !== -1) {
            if (confirm(`Delete "${foods[idx].name}"?`)) {
                foods.splice(idx, 1);
                save();
                location.reload();
            }
        }

    } else if (op === 'edit') {
        const sel = extraControls.querySelector('select');
        if (!sel || !sel.value) return alert('Please select a food to edit.');
        const idx = foods.findIndex(f => f.name === sel.value);
        if (idx !== -1) {
            const updated = promptFoodInfo(foods[idx]);
            if (updated) {
                foods[idx] = updated;
                save();
                location.reload();
            }
        }
    }
});

function save() {
    localStorage.setItem('myData', JSON.stringify(foods));
}

// build a <select> dropdown from the current foods array
function buildFoodSelect(placeholder) {
    const sel = document.createElement('select');
    const defaultOpt = document.createElement('option');
    defaultOpt.value = '';
    defaultOpt.innerText = placeholder;
    sel.appendChild(defaultOpt);

    foods.forEach(food => {
        const opt = document.createElement('option');
        opt.value = food.name;
        opt.innerText = food.name;
        sel.appendChild(opt);
    });

    return sel;
}

// prompt the user for food details, pre-fill if editing
function promptFoodInfo(existing = {}) {
    const name    = prompt('Food name:', existing.name || '');
    if (!name) return null;
    const cat     = prompt('Category:', existing.cat || '');
    const area    = prompt('Area / Cuisine:', existing.area || '');
    const image   = prompt('Image URL:', existing.image || '');
    const youtube = prompt('YouTube URL:', existing.youtube || '');
    return { name, cat, area, image, youtube };
}

// render all food cards with a staggered fade-in
async function renderGrid() {
    grid.innerHTML = '';
    for (let i = 0; i < foods.length; i++) {
        const card = createCard(foods[i]);
        card.classList.add('fade-in');
        grid.appendChild(card);
        await delay(150);
        card.classList.remove('fade-in');
    }
}

function createCard(food) {
    const card = document.createElement('div');
    card.classList.add('card');

    const img = document.createElement('img');
    img.src = food.image;
    img.alt = food.name;
    img.onerror = () => { img.src = 'https://via.placeholder.com/240x200?text=No+Image'; };

    const body = document.createElement('div');
    body.classList.add('card-body');

    body.innerHTML = `
        <p><strong>Name:</strong> ${food.name}</p>
        <p><strong>Category:</strong> ${food.cat}</p>
        <p><strong>Area:</strong> ${food.area}</p>
        <a href="${food.youtube}" target="_blank">▶ Watch Recipe</a>
    `;

    card.appendChild(img);
    card.appendChild(body);
    return card;
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

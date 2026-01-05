// Fetch and display recipes
const recipeList = document.getElementById('recipe-list');
if (recipeList) {
    fetch('/api/recipes')
        .then(res => res.json())
        .then(recipes => {
            recipes.forEach(recipe => {
                const card = document.createElement('div');
                card.className = 'recipe-card';
                card.innerHTML = `
                    <img src="${recipe.image}" alt="${recipe.name}">
                    <h3>${recipe.name}</h3>
                    <p><strong>Category:</strong> ${recipe.category}</p>
                    <p><strong>Ingredients:</strong> ${recipe.ingredients.join(', ')}</p>
                    <p><strong>Steps:</strong> ${recipe.steps}</p>
                `;
                recipeList.appendChild(card);
            });
        });
}

// Add recipe via API
const form = document.getElementById('recipe-form');
if (form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        const data = {
            name: document.getElementById('name').value,
            category: document.getElementById('category').value,
            ingredients: document.getElementById('ingredients').value.split(','),
            steps: document.getElementById('steps').value,
            image: document.getElementById('image').value || 'https://via.placeholder.com/250'
        };

        fetch('/api/recipes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(recipe => {
            alert('Recipe Added Successfully!');
            form.reset();
        });
    });
}

function truncateText(text, max = 100) {
    return text.length > max ? text.substr(0, max) + '...' : text;
}

recipes.forEach(recipe => {
    const card = document.createElement('div');
    card.className = 'recipe-card';
    card.innerHTML = `
        <img src="${recipe.image}" alt="${recipe.name}">
        <h3>${recipe.name}</h3>
        <p><strong>Category:</strong> ${recipe.category}</p>
        <p><strong>Ingredients:</strong> ${truncateText(recipe.ingredients.join(', '), 80)}</p>
        <p><strong>Steps:</strong> ${truncateText(recipe.steps, 100)}</p>
    `;
    recipeList.appendChild(card);
});


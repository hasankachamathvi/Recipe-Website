const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Load recipes
const getRecipes = () => {
    const data = fs.readFileSync(path.join(__dirname, 'recipes.json'));
    return JSON.parse(data);
}

// Save recipes
const saveRecipes = (recipes) => {
    fs.writeFileSync(path.join(__dirname, 'recipes.json'), JSON.stringify(recipes, null, 2));
}

// Get all recipes
app.get('/api/recipes', (req, res) => {
    const recipes = getRecipes();
    res.json(recipes);
});

// Add a recipe
app.post('/api/recipes', (req, res) => {
    const recipes = getRecipes();
    const { name, category, ingredients, steps, image } = req.body;
    const newRecipe = { id: Date.now(), name, category, ingredients, steps, image };
    recipes.push(newRecipe);
    saveRecipes(recipes);
    res.status(201).json(newRecipe);
});

// Server start
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});

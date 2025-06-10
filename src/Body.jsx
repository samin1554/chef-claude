import { useState } from "react"

export default function Body() {
    const [ingredients, setIngredients] = useState([])

    const ingredientsListItems = ingredients.map(ingredient => (
        <li key={ingredient}>{ingredient}</li>
    ))

    function addIngredient(formData) {
        const newIngredient = formData.get("ingredients")
        if (newIngredient.trim()) {  // Only add non-empty ingredients
            setIngredients(prevIngredients => [...prevIngredients, newIngredient])
        }
    }

    return (
        <main>
            <form className="add-ingredient-form" action={addIngredient}>
                <input
                    name="ingredients"
                    placeholder="Enter your recipe here..." 
                    type="text"
                    aria-label="Add Ingredients"
                />
                <button type="submit">Add Ingredient</button>
            </form>
            {ingredients.length > 0 && (
                <ul className="ingredients-list">
                    {ingredientsListItems}
                </ul>
            )}
        </main>
    )
}

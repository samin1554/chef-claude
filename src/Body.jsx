import React from "react"
// Import the AI function from your AI.js file
import { getRecipeFromMistral } from "./AI"
// Import react-markdown for rendering the AI's response
import ReactMarkdown from 'react-markdown'
import './styles/recipe.css'

export default function Main() {
    // State management using React hooks
    // ingredients: Array to store user-added ingredients
    // generatedRecipe: String to store the AI-generated recipe
    // isLoadingRecipe: Boolean to track recipe generation status
    // error: String to store any error messages
    const [ingredients, setIngredients] = React.useState([])
    const [generatedRecipe, setGeneratedRecipe] = React.useState("")
    const [isLoadingRecipe, setIsLoadingRecipe] = React.useState(false)
    const [error, setError] = React.useState(null)

    // Map through ingredients array to create list items
    // Each ingredient gets a unique key for React's reconciliation
    const ingredientsListItems = ingredients.map(ingredient => (
        <li key={ingredient}>{ingredient}</li>
    ))

    // Function to handle adding new ingredients
    // Prevents default form submission
    // Gets ingredient from form data
    // Only adds non-empty ingredients after trimming whitespace
    function addIngredient(event) {
        event.preventDefault()
        const formData = new FormData(event.target)
        const newIngredient = formData.get("ingredient")
        if (newIngredient?.trim()) {
            setIngredients(prevIngredients => [...prevIngredients, newIngredient.trim()])
            event.target.reset()
        }
    }

    // Function to handle recipe generation
    // Validates ingredients list
    // Manages loading state and error handling
    // Calls the AI service to generate recipe
    async function handleGetRecipe() {
        if (ingredients.length === 0) {
            setError("Please add some ingredients first!")
            setGeneratedRecipe("")
            return
        }

        setIsLoadingRecipe(true)
        setError(null)
        setGeneratedRecipe("")

        try {
            const recipe = await getRecipeFromMistral(ingredients)
            setGeneratedRecipe(recipe)
        } catch (err) {
            console.error("Failed to fetch recipe:", err)
            setError("Failed to load recipe. Please try again. (Check console for details)")
        } finally {
            setIsLoadingRecipe(false)
        }
    }

    return (
        <main>
            {/* Form for adding new ingredients */}
            <form onSubmit={addIngredient} className="add-ingredient-form">
                <input
                    type="text"
                    placeholder="e.g. oregano"
                    aria-label="Add ingredient"
                    name="ingredient"
                    required
                />
                <button type="submit">Add ingredient</button>
            </form>

            {/* Display ingredients list and recipe generation button if ingredients exist */}
            {ingredients.length > 0 && (
                <section>
                    <h2>Ingredients on hand:</h2>
                    <ul className="ingredients-list" aria-live="polite">{ingredientsListItems}</ul>
                    <div className="get-recipe-container">
                        <div>
                            <h3>Ready for a recipe?</h3>
                            <p>Generate a recipe from your list of ingredients.</p>
                        </div>
                        <button
                            type="button"
                            onClick={handleGetRecipe}
                            disabled={ingredients.length <= 3 || isLoadingRecipe}
                            className={ingredients.length <= 3 || isLoadingRecipe ? "disabled" : ""}
                        >
                            {isLoadingRecipe ? "Generating..." : "Get a recipe"}
                        </button>
                    </div>
                </section>
            )}

            {/* Recipe display section - shows loading state, error, or generated recipe */}
            {(isLoadingRecipe || generatedRecipe || error) && (
                <section className="recipe-section">
                    <h2>Chef Mistral Recommends:</h2>
                    <article className="suggested-recipe-container" aria-live="polite">
                        {/* Loading state with spinner */}
                        {isLoadingRecipe && (
                            <div className="loading-container">
                                <p>Generating recipe... This might take a moment.</p>
                                <div className="loading-spinner"></div>
                            </div>
                        )}
                        
                        {/* Error display */}
                        {error && (
                            <div className="error-container">
                                <p className="error-message">{error}</p>
                            </div>
                        )}

                        {/* Recipe content with custom markdown styling */}
                        {!isLoadingRecipe && !error && generatedRecipe && (
                            <div className="recipe-content">
                                <ReactMarkdown
                                    components={{
                                        // Custom styling for different markdown elements
                                        h1: (props) => <h1 className="recipe-title" {...props} />,
                                        h2: (props) => <h2 className="recipe-subtitle" {...props} />,
                                        h3: (props) => <h3 className="recipe-section-title" {...props} />,
                                        ul: (props) => <ul className="recipe-list" {...props} />,
                                        ol: (props) => <ol className="recipe-steps" {...props} />,
                                        li: (props) => <li className="recipe-item" {...props} />,
                                        p: (props) => <p className="recipe-paragraph" {...props} />,
                                        strong: (props) => <strong className="recipe-strong" {...props} />,
                                    }}
                                >
                                    {generatedRecipe}
                                </ReactMarkdown>
                            </div>
                        )}

                        {/* Guidance text when ready to generate recipe */}
                        {!isLoadingRecipe && !error && !generatedRecipe && ingredients.length > 3 && (
                            <p className="recipe-guidance">Click "Get a recipe" to generate one based on your ingredients!</p>
                        )}
                    </article>
                </section>
            )}
        </main>
    )
}

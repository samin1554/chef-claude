import { HfInference } from '@huggingface/inference'

// Initialize the Hugging Face client with your API key
// Note: In a production environment, this should be stored in environment variables
const hf = new HfInference('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')

// System prompt that defines the AI's role and behavior
const systemPrompt = `You are a helpful AI chef assistant. Your task is to suggest a recipe based on a list of ingredients provided by the user. 
Please format your response in markdown with the following structure:

# [Recipe Name]

## Ingredients
- List all ingredients needed (including quantities)

## Instructions
1. Step-by-step instructions
2. Make it clear and easy to follow

## Tips
- Add any helpful tips or notes about the recipe

Keep the recipe simple and focus on using the ingredients provided. If additional common ingredients are needed, mention them but keep it minimal.`

/**
 * Generates a recipe using the Mistral AI model
 * @param {string[]} ingredients - Array of ingredients provided by the user
 * @returns {Promise<string>} - The generated recipe in markdown format
 */
export async function getRecipeFromMistral(ingredients) {
    try {
        // Format the user's message with their ingredients
        const userMessage = `Here are my ingredients: ${ingredients.join(', ')}. Can you suggest a recipe?`

        // Make the API call to Mistral
        const response = await hf.chatCompletion({
            model: 'mistralai/Mistral-7B-Instruct-v0.2',
            messages: [
                { role: 'system', content: systemPrompt },
                { role: 'user', content: userMessage }
            ],
            max_tokens: 1000,
            temperature: 0.7
        })

        // Extract and return the generated recipe
        return response.choices[0].message.content
    } catch (error) {
        // Log the error for debugging
        console.error('Error generating recipe:', error)
        // Throw a user-friendly error
        throw new Error('Failed to generate recipe. Please try again.')
    }
} 
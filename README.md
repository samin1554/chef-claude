# Chef Claude - AI Recipe Generator

A React application that generates recipes based on ingredients you have on hand, powered by the Mistral AI model.

## Features

- Add ingredients to your list
- Generate recipes using AI
- Beautiful markdown formatting for recipes
- Responsive design
- Loading states and error handling

## Tech Stack

- React
- Hugging Face Inference API (Mistral AI)
- React Markdown
- CSS3

## Project Structure

```
src/
├── AI.js              # AI integration with Mistral
├── Body.jsx           # Main component with recipe generation logic
├── styles/
│   └── recipe.css     # Styling for recipe display
└── main.jsx           # Application entry point
```

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## How It Works

1. **Adding Ingredients**: Users can add ingredients to their list through a simple form interface.
2. **Recipe Generation**: When ready, users can click "Get a recipe" to generate a recipe using the Mistral AI model.
3. **Recipe Display**: The generated recipe is displayed in a clean, formatted layout with proper sections for ingredients, instructions, and tips.

## Code Explanation

### AI Integration (`AI.js`)
- Uses the Hugging Face Inference API to interact with the Mistral AI model
- Includes a system prompt that guides the AI to generate well-formatted recipes
- Handles error cases and provides user-friendly error messages

### Main Component (`Body.jsx`)
- Manages the application state using React hooks
- Handles user input for ingredients
- Controls the recipe generation process
- Renders the UI with proper loading states and error handling

### Styling (`recipe.css`)
- Provides a clean, modern design for the recipe display
- Includes animations for loading states
- Ensures responsive layout across different screen sizes

## Future Improvements

- Add ability to save favorite recipes
- Implement ingredient categories
- Add recipe sharing functionality
- Support for multiple AI models
- Add user authentication

## Contributing

Feel free to submit issues and enhancement requests!

## License

This project is licensed under the MIT License - see the LICENSE file for details.

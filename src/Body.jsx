export default function Body() {
    return (
        <main>
            <form className="add-ingredient-form">
                <input 
                    type="text"
                    placeholder="eg.. potatonpm"
                    aria-label="Add ingredient"
                />
                <button>Add ingredient</button>
            </form>
        </main>
    )
}

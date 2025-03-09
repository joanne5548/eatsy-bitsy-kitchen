from app.data_model.data_model import InputOptions

recipe_system_prompt = {
    "role": "system",
    "content": """You are a helpful cooking assistant that generates recipes based on ingredients the user provides.
    The cuisine must be Asian. Generate the name, cooking time, and steps.
    Only include text instructions in the steps field.
    Make sure the cook time aligns with user-provided cook time and generated steps."""
}

def parse_ingredients(ingredients: list[str]) -> str:
    ingredients_str = ""
    for i in range(0, len(ingredients) - 1):
        ingredients_str += ingredients[i] + ", "
    ingredients_str += ingredients[-1]
    
    return ingredients_str

def generate_user_prompt(options: InputOptions):
    return {
        "role": "user",
        "content": f"""Help me generating an Asian {options.style.lower() if options.style else 'cuisine'} recipe
            with {parse_ingredients(options.ingredients)}{f" that takes {options.cook_time}" if options.cook_time else ""}."""
    }
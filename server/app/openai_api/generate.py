from openai import OpenAI
from dotenv import load_dotenv

from ..data_model.data_model import InputOptions, Recipe

load_dotenv()

client = OpenAI()

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

def generate_user_content(options: InputOptions):
    print(f"""Help me generating an Asian {options.style.lower() if options.style else 'cuisine'} recipe
            with {parse_ingredients(options.ingredients)}{f" that takes {options.cook_time}" if options.cook_time else ""}.""")
    return f"""Help me generating an Asian {options.style.lower() if options.style else 'cuisine'} recipe
            with {parse_ingredients(options.ingredients)}{f" that takes {options.cook_time}" if options.cook_time else ""}."""

def generate_recipe(options: InputOptions):
    user_prompt = {
        "role": "user",
        "content": generate_user_content(options)
    }

    completion = client.beta.chat.completions.parse(
        model="gpt-4o-mini",
        messages=[
            recipe_system_prompt,
            user_prompt,
        ],
        response_format=Recipe,
        store=True
    )

    result = completion.choices[0].message.parsed

    img_url = generate_image(result.name)
    result.img_url = img_url

    return result

def generate_image(food_name: str):
    try:
        response = client.images.generate(
            model='dall-e-2',
            prompt=f'{food_name} in a bowl on a table, zoomed out x3, warm light',
            size='256x256',
            quality='standard',
            n=1,
        )
        return response.data[0].url
    except Exception as e:
        print(f"Error occured sending image generation request:\n{str(e)}")
        return None

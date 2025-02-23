from openai import OpenAI
from dotenv import load_dotenv
import json

load_dotenv()

client = OpenAI()

recipe_system_prompt = {
    "role": "system",
    "content": """You are a helpful cooking assistant that generates recipes based on ingredients the user provides.
    The cuisine must be Asian, however, the cooking process should be compatible with cooking equipments
    that can be found in average American household.
    Format the answer into the json:
    {
        "name": "<dish_name>",
        "time": "<estimated_cooking_time>,
        "steps": [
            "<first_step>",
            "<second_step>",
            ...
        ],
    }""",
}

def generate_recipe(ingredients, style=None):
    user_prompt = {
        "role": "user",
        "content": f"Help me generating an Asian {style if style else 'cuisine'} recipe with {ingredients}."
    }

    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            recipe_system_prompt,
            user_prompt,
        ],
        store=True
    )

    result = json.loads(completion.choices[0].message.content)

    img_url = generate_image(result['name'])
    result['img_url'] = img_url

    return result

def generate_image(food_name):
    response = client.images.generate(
        model='dall-e-2',
        prompt=f'{food_name} in a bowl on a table, zoomed out x3, warm light',
        size='256',
        quality='standard',
        n=1,
    )

    return response.data[0].url
from openai import OpenAI
from dotenv import load_dotenv
from app.data_model.data_model import InputOptions, Recipe
from app.openai_api import openai_prompt
from app.openai_api.openai_prompt import generate_user_prompt

load_dotenv()
client = OpenAI()

def generate_recipe(options: InputOptions):
    completion = client.beta.chat.completions.parse(
        model="gpt-4o-mini",
        messages=[
            openai_prompt.recipe_system_prompt,
            generate_user_prompt(options),
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
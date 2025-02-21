from openai import OpenAI
from dotenv import load_dotenv
import json

load_dotenv()


def generate_recipe(ingredients):
    client = OpenAI()
    system_prompt = {
        "role": "system",
        "content": """You are a helpful cooking assistant that generates recipes based on ingredients the user provides.
        The cuisine must be Asian, however, the cooking process should be compatible with cooking equipments that are common
        in average American household. Answer in following sections:
        First, the name of the dish,
        Second, the estimated cooking time,
        And third, steps to follow. Each step must be one sentence.
        Format the anwer into a json. For example:
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
    user_prompt = {
        "role": "user",
        "content": f"I have {ingredients} in my fridge. Help me generate a recipe that is Asian cuisine."
    }

    completion = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            system_prompt,
            user_prompt,
        ],
        store=True
    )

    result = json.loads(completion.choices[0].message.content)
    return result

ingredients = "gochujang, rice, chicken, green onion, onion"
generate_recipe(ingredients)

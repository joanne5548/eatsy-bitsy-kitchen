from openai import OpenAI
import os
from dotenv import load_dotenv

load_dotenv()

print(os.getenv("OPENAI_API_KEY"))

client = OpenAI()

ingredients = "chicken, noodles, soy sauce, bok choy, eggs"

completion = client.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {
            "role": "system",
            "content": """You are a helpful cooking assistant that generates recipes based on ingredients the user provides.
            The cuisine must be Asian, however, the cooking process should be compatible with cooking equipments that are common
            in average American household. Format your answer in three sections:
            First, the name of the dish,
            Second, the estimated cooking time,
            And third, list of steps to follow.""",
        },
        {
            "role": "user",
            "content": f"I have {ingredients} in my fridge. Help me generate a recipe that is Asian cuisine."
        }
    ],
)

print(completion.choices[0].message)

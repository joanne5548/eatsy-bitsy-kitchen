import { InputOptions, Recipe } from "./interfaces";

const backendUrl = import.meta.env.VITE_BACKEND_URL

export const generateRecipe = async (
    options: InputOptions,
    callback: () => void
) => {
    try {
        const response = await fetch(`${backendUrl}/api/generate`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(options),
        });

        if (!response.ok) {
            throw new Error(`Response is not okay !! ${response.status}`);
        }

        const recipe: Recipe = await response.json();
        return recipe;
    } catch (error) {
        if (error instanceof Error) {
            console.log(`backend error message: ${error.message}`);
        } else {
            console.log(`unknown error: ${error}`);
        }
    } finally {
        callback();
    }
};

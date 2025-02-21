import { options, recipe } from "./interfaces";

export const getResults = async (options: options) => {
    try {
        const response = await fetch("http://localhost:8000/generate", {
            method: "GET",
            body: JSON.stringify(options)
        });

        if (!response.ok) {
            throw new Error(`Response is not okay !! ${response.status}`)
        }
        
        const recipe: recipe = await response.json();
        return recipe;
    }
    catch (error) {
        if (error instanceof Error) {
            console.log(`backend error message: ${error.message}`);
        }
        else {
            console.log(`unknown error: ${error}`)
        }
    }
}
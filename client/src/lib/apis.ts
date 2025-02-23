import { options, recipe } from "./interfaces";

export const getResults = async (options: options, callback: () => void) => {
    try {
        const response = await fetch("http://localhost:8000/generate", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
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
    finally {
        callback();
    }
}
import { useState } from "react";
import { getResults } from "../lib/apis";
import { ingredients, foodStyles } from "../lib/list";
import InputButton from "./InputButton";
import { useAtom } from "jotai";
import { generatedRecipeAtom } from "../lib/atoms";
import { PiSpinnerBold } from "react-icons/pi";

const OptionsPanel = () => {
    const [selectedIngredients, setSelectedIngredients] = useState<Set<string>>(
        new Set<string>()
    );
    const [style, setStyle] = useState<string | null>(null);
    const [generatedRecipe, setGeneratedRecipe] = useAtom(generatedRecipeAtom);
    const [generatingRecipe, setGeneratingRecipe] = useState<boolean>(false);

    const updateIngredients = (ingredient: string) => {
        let updatedSelectedIngredients = new Set<string>(selectedIngredients);
        if (updatedSelectedIngredients.has(ingredient)) {
            updatedSelectedIngredients.delete(ingredient);
        } else {
            updatedSelectedIngredients.add(ingredient);
        }

        console.log(updatedSelectedIngredients);
        setSelectedIngredients(updatedSelectedIngredients);
    };

    const updateStyles = (style: string) => {
        setStyle(style);
    };

    const setGeneratingRecipeToFalse = () => {
        setGeneratingRecipe(false);
    };

    const handleGenerateButtonClick = async () => {
        const options = {
            ingredients: [...selectedIngredients],
            style: style,
        };
        console.log(options);

        setGeneratingRecipe(true);
        const recipe = await getResults(options, setGeneratingRecipeToFalse);

        if (!recipe) {
            throw new Error("The recipe returned is invalid.");
        }

        setGeneratedRecipe(recipe);
    };

    return (
        <div className="flex flex-col gap-2 w-1/2">
            <div className="flex flex-row justify-between items-center">
                <div className="text-xl">Select ingredients:</div>
                <button className="px-2 py-1 rounded-xl text-lg border-[1px] border-slate-400 hover:bg-slate-200 hover:cursor-pointer">
                    Clear
                </button>
            </div>
            <div className="flex flex-wrap flex-row gap-2.5 w-full p-4 rounded-xl text-base border-[1px] border-slate-400">
                {ingredients.map((ingredient) => (
                    <InputButton
                        option={ingredient}
                        updateOptionList={updateIngredients}
                    />
                ))}
            </div>
            <div className="text-xl">Select style (optional):</div>
            <div className="flex flex-wrap flex-row gap-2.5 w-full p-4 rounded-xl text-base border-[1px] border-slate-400">
                {foodStyles.map((style) => (
                    <InputButton
                        option={style}
                        updateOptionList={updateStyles}
                    />
                ))}
            </div>

            <button
                onClick={handleGenerateButtonClick}
                className="flex flex-row gap-2 items-center w-fit self-end px-2 py-1 text-lg rounded-xl border-[1px] border-slate-400 hover:bg-slate-200 hover:cursor-pointer"
            >
                {generatingRecipe && (
                    <PiSpinnerBold className="animate-spin size-4" />
                )}
                Generate
            </button>
        </div>
    );
};

export default OptionsPanel;

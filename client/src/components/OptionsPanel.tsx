import { useState } from "react";
import { getResults } from "../lib/apis";
import { ingredients, foodStyles } from "../lib/list";
import OptionButton from "./InputButton";
import { useSetAtom } from "jotai";
import { generatedRecipeAtom, generatingRecipeAtom } from "../lib/atoms";
import { InputOptions } from "../lib/interfaces";

const OptionsPanel = () => {
    const [selectedIngredients, setSelectedIngredients] = useState<Set<string>>(
        new Set<string>()
    );
    const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
    const setGeneratedRecipe = useSetAtom(generatedRecipeAtom);
    const setGeneratingRecipe = useSetAtom(generatingRecipeAtom);

    const updateIngredients = (ingredient: string) => {
        let updatedSelectedIngredients = new Set<string>(selectedIngredients);
        if (updatedSelectedIngredients.has(ingredient)) {
            updatedSelectedIngredients.delete(ingredient);
        } else {
            updatedSelectedIngredients.add(ingredient);
        }

        setSelectedIngredients(updatedSelectedIngredients);
    };

    const updateStyles = (newStyle: string) => {
        if (selectedStyle === newStyle) {
            console.log("null");
            setSelectedStyle(null);
        } else {
            console.log(newStyle);
            setSelectedStyle(newStyle);
        }
    };

    const setGeneratingRecipeToFalse = () => {
        setGeneratingRecipe(false);
    };

    const handleClearButtonClick = () => {
        const emptySelectedIngredients = new Set<string>();
        setSelectedIngredients(emptySelectedIngredients);
        setSelectedStyle(null);
    };

    const handleGenerateButtonClick = async () => {
        if (!selectedIngredients.size) {
            alert("Please select ingredients to generate recipe.")
            return;
        }

        let options: InputOptions = {
            ingredients: [...selectedIngredients],
        };
        if (selectedStyle) {
            options = {
                ...options,
                style: selectedStyle,
            };
        }
        // if (cookTime) {
        //     options = {
        //         ...options,
        //         cookTime: cookTime
        //     }
        // }
        console.log(options);

        setGeneratedRecipe(null);
        setGeneratingRecipe(true);
        const recipe = await getResults(options, setGeneratingRecipeToFalse);

        if (!recipe) {
            throw new Error("The recipe returned is invalid.");
        }

        setGeneratedRecipe(recipe);
    };

    return (
        <div className="flex flex-col gap-2 pb-4 border-b-2 border-slate-200 sm:w-1/2">
            <div className="flex flex-row justify-between items-center">
                <div className="text-lg sm:text-xl">Select ingredients:</div>
                <button
                    onClick={handleClearButtonClick}
                    className="px-2 py-1 rounded-xl text-base sm:text-lg border-[1px] border-slate-400 hover:bg-slate-200 hover:cursor-pointer"
                >
                    Clear
                </button>
            </div>
            <div className="flex flex-wrap flex-row gap-2.5 w-full p-4 rounded-xl text-base border-[1px] border-slate-400">
                {ingredients.map((ingredient) => (
                    <OptionButton
                        key={ingredient}
                        buttonName={ingredient}
                        selected={selectedIngredients.has(ingredient)}
                        updateOptionList={(() => updateIngredients(ingredient))}
                    />
                ))}
            </div>
            <div className="text-lg sm:text-xl">Select style (optional):</div>
            <div className="flex flex-wrap flex-row gap-2.5 w-full p-4 rounded-xl text-base border-[1px] border-slate-400">
                {foodStyles.map((style) => (
                    <OptionButton
                        key={style}
                        buttonName={style}
                        selected={style === selectedStyle}
                        updateOptionList={(() => updateStyles(style))}
                    />
                ))}
            </div>
            <button
                onClick={handleGenerateButtonClick}
                className="flex flex-row gap-2 items-center w-fit self-end px-2 py-1 text-base sm:text-lg rounded-xl border-[1px] border-slate-400 hover:bg-slate-200 hover:cursor-pointer"
            >
                Generate
            </button>
        </div>
    );
};

export default OptionsPanel;

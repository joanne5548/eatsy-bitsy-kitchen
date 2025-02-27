import { useState } from "react";
import { generatedRecipeAtom, generatingRecipeAtom } from "../lib/atoms";
import { generateRecipe } from "../lib/generateRecipeApi";
import { InputOptions } from "../lib/interfaces";
import { ingredients, foodStyles, cookTime } from "../lib/list";
import { useSetAtom } from "jotai";
import OptionButton from "./OptionButton";
import CustomInputButton from "./CustomInputButton";

const OptionsPanel = () => {
    const [selectedIngredients, setSelectedIngredients] = useState<Set<string>>(
        new Set<string>()
    );
    const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
    const [selectedCookTime, setSelectedCookTime] = useState<string | null>(
        null
    );

    const [addedIngredientsList, setAddedIngredientsList] = useState<string[]>(
        []
    );

    const setGeneratedRecipe = useSetAtom(generatedRecipeAtom);
    const setGeneratingRecipe = useSetAtom(generatingRecipeAtom);

    const updateSelectedIngredients = (ingredient: string) => {
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
            setSelectedStyle(null);
        } else {
            setSelectedStyle(newStyle);
        }
    };

    const updateCookTime = (newCookTime: string) => {
        if (selectedStyle === newCookTime) {
            setSelectedCookTime(null);
        } else {
            setSelectedCookTime(newCookTime);
        }
    };

    const setGeneratingRecipeToFalse = () => {
        setGeneratingRecipe(false);
    };

    const handleClearButtonClick = () => {
        const emptySelectedIngredients = new Set<string>();
        setSelectedIngredients(emptySelectedIngredients);
        setAddedIngredientsList([]);
        setSelectedStyle(null);
        setSelectedCookTime(null);
    };

    const handleGenerateButtonClick = async () => {
        if (!selectedIngredients.size) {
            alert("Please select ingredients to generate recipe.");
            return;
        }

        const options: InputOptions = {
            ingredients: [...selectedIngredients],
            ...(selectedStyle && { style: selectedStyle }),
            ...(selectedCookTime && { cook_time: selectedCookTime }),
        };
        console.log(options);

        setGeneratedRecipe(null);
        setGeneratingRecipe(true);
        const recipe = await generateRecipe(
            options,
            setGeneratingRecipeToFalse
        );

        if (!recipe) {
            throw new Error("The recipe returned is invalid.");
        }

        setGeneratedRecipe(recipe);
    };

    // const selectionSection = ({
    //     optionList,
    //     isSelected,
    //     updateOptionList,
    //     children=null
    // } => (
    //     <></>
    // )
    // );

    return (
        <div className="flex flex-col gap-2 pb-4 border-b-2 border-slate-200 sm:border-b-0 sm:w-1/2">
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
                        updateOptionList={() =>
                            updateSelectedIngredients(ingredient)
                        }
                    />
                ))}
                {addedIngredientsList.map((ingredient) => (
                    <OptionButton
                        key={ingredient}
                        buttonName={ingredient}
                        selected={selectedIngredients.has(ingredient)}
                        updateOptionList={() =>
                            updateSelectedIngredients(ingredient)
                        }
                    />
                ))}
                <CustomInputButton
                    addNewIngredient={(ingredient: string) => {
                        updateSelectedIngredients(ingredient);
                        setAddedIngredientsList([
                            ...addedIngredientsList,
                            ingredient,
                        ]);
                    }}
                />
            </div>
            <div className="text-lg sm:text-xl">Select style (optional):</div>
            <div className="flex flex-wrap flex-row gap-2.5 w-full p-4 rounded-xl text-base border-[1px] border-slate-400">
                {foodStyles.map((style) => (
                    <OptionButton
                        key={style}
                        buttonName={style}
                        selected={style === selectedStyle}
                        updateOptionList={() => updateStyles(style)}
                    />
                ))}
            </div>
            <div className="text-lg sm:text-xl">
                Select cook time (optional):
            </div>
            <div className="flex flex-wrap flex-row gap-2.5 w-full p-4 rounded-xl text-base border-[1px] border-slate-400">
                {cookTime.map((time) => (
                    <OptionButton
                        key={time}
                        buttonName={time}
                        selected={time === selectedCookTime}
                        updateOptionList={() => updateCookTime(time)}
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

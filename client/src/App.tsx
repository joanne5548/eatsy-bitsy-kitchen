import { useState } from "react";
import InputButton from "./components/InputButton";
import { foodStyles, ingredients } from "./lib/list";

function App() {
    const [selectedIngredients, setSelectedIngredients] = useState<Set<string>>(
        new Set<string>()
    );

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

    // useEffect(() => {
    // 	console.log(selectedIngredients);
    // }, [])

    return (
        <div className="flex flex-col gap-8 py-4 items-center">
            <div className="text-4xl font-medium">
                Welcome to Recipe Generator!
            </div>
            <div className="flex flex-col gap-2 w-1/2">
                <div className="text-xl">Select ingredients:</div>
                <div className="flex flex-wrap flex-row gap-2.5 w-full p-4 rounded-xl text-base border-[1px] border-slate-400">
                    {ingredients.map((ingredient) => (
                        <InputButton
                            option={ingredient}
                            updateOptionList={updateIngredients}
                        />
                    ))}
                </div>
                {/* <div className="text-xl">Select Style:</div>
                <div className="flex flex-wrap flex-row gap-2.5 w-full p-4 rounded-xl text-base border-[1px] border-slate-400">
                    {foodStyles.map((style) => (
                        <InputButton
                            option={style}
                            updateOptionList={updateStyles}
                        />
                    ))}
                </div> */}

                <button className="w-fit self-end px-2 py-1 text-lg rounded-xl border-[1px] border-slate-400 hover:bg-slate-200 hover:cursor-pointer">
                    Generate
                </button>
            </div>
        </div>
    );
}

export default App;

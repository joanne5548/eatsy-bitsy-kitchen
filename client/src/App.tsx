import { useAtomValue } from "jotai";
import OptionsPanel from "./components/OptionsPanel";
import { generatedRecipeAtom } from "./lib/atoms";
import clsx from "clsx";
import RecipePanel from "./components/RecipePanel";

function App() {
    const generatedRecipe = useAtomValue(generatedRecipeAtom);

    return (
        <div className="flex flex-col gap-4 sm:gap-8 pl-8 pr-4 py-4 sm:h-screen items-center">
            <div className="text-2xl sm:text-4xl font-medium">
                Welcome to Recipe Generator!
            </div>
            <div
                className={clsx(
                    "flex flex-col sm:flex-row gap-4 sm:gap-8 sm:h-[calc(100%-73px)]",
                    generatedRecipe && "sm:justify-between"
                )}
            >
                <OptionsPanel />
                <RecipePanel />
            </div>
        </div>
    );
}

export default App;

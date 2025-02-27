import { useAtomValue } from "jotai";
import OptionsPanel from "./components/OptionsPanel";
import { generatedRecipeAtom } from "./lib/atoms";
import clsx from "clsx";
import RecipePanel from "./components/RecipePanel";
import logo from "./assets/eatsy-bitsy-kitchen logo.png";

function App() {
    const generatedRecipe = useAtomValue(generatedRecipeAtom);

    return (
        <div className="flex flex-col gap-4 sm:gap-6 p-4 sm:pl-8 sm:h-screen items-center">
            <div className="flex flex-row gap-2 items-center">
                <img
                    src={logo}
                    className="self-center sm:inline rounded-full size-16 sm:size-20 mr-2 sm:mr-4"
                />
                <div className="text-2xl sm:text-4xl font-medium">Welcome to Eatsy Bitsy Kitchen!</div>
            </div>
            <div
                className={clsx(
                    "flex flex-col sm:flex-row gap-4 sm:gap-8",
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

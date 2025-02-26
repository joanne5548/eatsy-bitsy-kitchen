import { useAtomValue } from "jotai";
import { generatedRecipeAtom, generatingRecipeAtom } from "../lib/atoms";
import { PiSpinnerBold } from "react-icons/pi";

const RecipePanel = () => {
    const generatedRecipe = useAtomValue(generatedRecipeAtom);
    const generatingRecipe = useAtomValue(generatingRecipeAtom);

    return (
        <div className="sm:w-1/2 h-full sm:overflow-y-auto">
            {generatedRecipe ? (
                <div className="flex flex-col gap-2 h-full">
                    <div className="text-[22px]">{generatedRecipe.name}</div>
                    <div className="flex flex-col gap-2 sm:flex-row sm:justify-between">
                        {generatedRecipe.img_url && (
                            <img
                                src={generatedRecipe.img_url}
                                className="self-center object-cover rounded-xl"
                            />
                        )}
                        <div className="text-lg self-end">
                            {generatedRecipe.cook_time}
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        {generatedRecipe.steps.map((step, index) => {
                            return (
                                <div className="text-base">
                                    {index + 1}. {step}
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : (
                <div className="flex h-full justify-center items-center">
                    {generatingRecipe ? (
                        <div className="text-lg">
                            <PiSpinnerBold className="inline animate-spin size-4.5 mr-2 align-baseline" />
                            Generating Recipe...
                        </div>
                    ) : (
                        <div className="text-lg">
                            Click generate to see the recipe :D
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default RecipePanel;

import { useAtomValue } from "jotai";
import { generatedRecipeAtom, generatingRecipeAtom } from "../lib/atoms";
import { PiSpinnerBold } from "react-icons/pi";

const RecipePanel = () => {
    const generatedRecipe = useAtomValue(generatedRecipeAtom);
    const generatingRecipe = useAtomValue(generatingRecipeAtom);

    return (
        <div className="relative sm:w-1/2 flex-1 flex flex-col py-2 px-2 sm:pr-4 rounded-xl sm:border-[1px] border-slate-400 sm:overflow-hidden">
            {generatedRecipe ? (
                <div className="absolute inset-0 p-2 flex flex-col gap-2 sm:overflow-y-auto">
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
                                <div key={index} className="text-base">
                                    {index + 1}. {step}
                                </div>
                            );
                        })}
                    </div>
                </div>
            ) : (
                <div className="flex flex-1 justify-center items-center">
                    {generatingRecipe ? (
                        <div className="text-lg">
                            <PiSpinnerBold className="inline animate-spin size-4.5 mr-2 align-baseline" />
                            Generating Recipe...
                        </div>
                    ) : (
                        <div className="text-base sm:text-lg">
                            Click generate to see the recipe :D
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default RecipePanel;

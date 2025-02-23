import { useAtomValue } from "jotai";
import { generatedRecipeAtom } from "../lib/atoms";

const RecipePanel = () => {
    const generatedRecipe = useAtomValue(generatedRecipeAtom);

    return (
        <div className="w-1/2 h-full overflow-y-auto">
            {generatedRecipe ? (
                <div className="flex flex-col gap-2 h-full">
                    <div className="text-[22px]">{generatedRecipe.name}</div>
                    <img
                        src={generatedRecipe.img_url}
                        className="self-center w-full max-w-[40rem] h-1/6 object-cover rounded-xl"
                    />
                    <div className="text-lg self-end">
                        {generatedRecipe.time}
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
                    <div className="text-lg">Click generate to see recipe!</div>
                </div>
            )}
        </div>
    );
};

export default RecipePanel;

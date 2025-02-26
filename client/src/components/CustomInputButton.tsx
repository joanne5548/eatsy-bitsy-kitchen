import { useRef, useState } from "react";

interface CustomInputButtonProps {
    addNewIngredient: (ingredient: string) => void;
}

const CustomInputButton = ({ addNewIngredient }: CustomInputButtonProps) => {
    const [allowInput, setAllowInput] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    const handleOnClick = () => {
        setAllowInput(!allowInput);
    };

    const handleInputClick = (
        event: React.MouseEvent<HTMLInputElement, MouseEvent>
    ) => {
        event.stopPropagation();
    };

    const handleSubmitNewOption = (
        event: React.KeyboardEvent<HTMLInputElement>
    ) => {
        if (event.key === "Enter" && inputRef.current) {
            addNewIngredient(inputRef.current.value);
            inputRef.current.value = "";
        }
    };

    return (
        <div
            onClick={handleOnClick}
            className="flex flex-row gap-2 w-fit px-1.5 py-1 rounded-xl border-[1px] border-rose-400 hover:bg-rose-200 hover:cursor-pointer"
        >
            <button className="hover:cursor-pointer">
                <div className="text-sm sm:text-base">
                    Other {!allowInput && "(Click to enter)"}
                </div>
            </button>
            {allowInput && (
                <input
                    ref={inputRef}
                    autoFocus
                    onClick={handleInputClick}
                    onKeyDown={handleSubmitNewOption}
                    className="px-1 py-0.5 text-sm leading-3 rounded-lg bg-white border-[1px] border-slate-500 outline-none"
                />
            )}
        </div>
    );
};

export default CustomInputButton;

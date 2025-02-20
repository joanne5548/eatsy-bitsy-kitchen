import { useEffect, useState } from "react";
import { generateColor } from "../lib/randomColor";

interface InputButtonProps {
    option: string;
    updateOptionList: (option: string) => void;
}

const InputButton = ({
    option,
    updateOptionList: updateIngredients,
}: InputButtonProps) => {
    const [clicked, setClicked] = useState<boolean>(false);
    // const [color, setColor] = useState<string>("slate");

    let className = `w-fit px-1.5 py-1 rounded-xl border-[1px] border-slate-400 hover:bg-slate-200 hover:cursor-pointer `;
    if (clicked) {
        className += `bg-slate-200`;
    }

    const handleOnClick = () => {
        updateIngredients(option);
        setClicked(!clicked);
    };

    // useEffect(() => {
    //     const color = generateColor();
    //     console.log(color);
    //     setColor(color);
    // }, []);

    return (
        <button onClick={handleOnClick} className={className}>
            {option}
        </button>
    );
};

export default InputButton;

import { useEffect, useState } from "react";
import { generateColor } from "../lib/randomColor";
import { ColorOptions } from "../lib/interfaces";

interface OptionButtonProps {
    buttonName: string;
    selected: boolean;
    updateOptionList: () => void;
}

const OptionButton = ({
    buttonName,
    selected,
    updateOptionList,
}: OptionButtonProps) => {
    const [color, setColor] = useState<string>("slate");

    const colorOptions: ColorOptions = {
        red: "border-red-400 hover:bg-red-200",
        orange: "border-orange-400 hover:bg-orange-200",
        amber: "border-amber-400 hover:bg-amber-200",
        yellow: "border-yellow-400 hover:bg-yellow-200",
        lime: "border-lime-400 hover:bg-lime-200",
        green: "border-green-400 hover:bg-green-200",
        emerald: "border-emerald-400 hover:bg-emerald-200",
        violet: "border-violet-400 hover:bg-violet-200",
        purple: "border-purple-400 hover:bg-purple-200",
        fuchsia: "border-fuchsia-400 hover:bg-fuchsia-200",
        pink: "border-pink-400 hover:bg-pink-200",
        rose: "border-rose-400 hover:bg-rose-200",
    };

    const backgroundOptions: ColorOptions = {
        red: "bg-red-200",
        orange: "bg-orange-200",
        amber: "bg-amber-200",
        yellow: "bg-yellow-200",
        lime: "bg-lime-200",
        green: "bg-green-200",
        emerald: "bg-emerald-200",
        violet: "bg-violet-200",
        purple: "bg-purple-200",
        fuchsia: "bg-fuchsia-200",
        pink: "bg-pink-200",
        rose: "bg-rose-200",
    };

    let className = `w-fit px-1.5 py-1 text-sm sm:text-base rounded-xl border-[1px] ${
        colorOptions[color as keyof ColorOptions]
    } hover:cursor-pointer `;
    if (selected) {
        className += `${backgroundOptions[color as keyof ColorOptions]}`;
    }

    const handleOnClick = () => {
        updateOptionList();
    };

    useEffect(() => {
        const color = generateColor();
        setColor(color);
    }, []);

    return (
        <button onClick={handleOnClick} className={className}>
            {buttonName}
        </button>
    );
};

export default OptionButton;

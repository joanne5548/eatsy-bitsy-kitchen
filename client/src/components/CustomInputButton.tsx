import { useState } from "react";

const CustomInputButton = () => {
    const [allowInput, setAllowInput] = useState<boolean>(false);

    const handleOnClick = () => {
        setAllowInput(!allowInput);
    }

    return (
        <button onClick={handleOnClick} className="flex flex-row gap-2 w-fit px-1.5 py-1 rounded-xl border-[1px] border-rose-400 hover:cursor-pointer">
            <div className="text-sm sm:text-base">
                Other {!allowInput && "(Click to enter)"}
            </div>
            {allowInput && <input type="text" className="pointer-events-none border-black hover:cursor-default" />}
        </button>
    );
};

export default CustomInputButton;

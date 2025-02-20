import { colors } from "./list"

export const generateColor = () => {
    const ind = Math.floor(Math.random() * 12);
    const color = colors[ind];
    return color;
}
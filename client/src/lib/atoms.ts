import { atom } from "jotai";
import { recipe } from "./interfaces";

export const generatedRecipeAtom = atom<recipe | null>(null);
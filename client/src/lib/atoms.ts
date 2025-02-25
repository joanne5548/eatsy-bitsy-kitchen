import { atom } from "jotai";
import { Recipe } from "./interfaces";

export const generatedRecipeAtom = atom<Recipe | null>(null);

export const generatingRecipeAtom = atom<boolean>(false);

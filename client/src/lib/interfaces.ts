export interface InputOptions {
    ingredients: string[];
    style?: string;
    cook_time?: string;
}

export interface Recipe {
    name: string;
    cook_time: string;
    steps: string[];
    img_url: string | null;
}

export interface ColorOptions {
    red: string;
    orange: string;
    amber: string;
    yellow: string;
    lime: string;
    green: string;
    emerald: string;
    violet: string;
    purple: string;
    fuchsia: string;
    pink: string;
    rose: string;
}

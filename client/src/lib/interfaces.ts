export interface InputOptions {
    ingredients: string[];
    style?: string;
    cookTime?: string;
    // TODO: insert style and cook time as optional - then finish type hinting in data_model.py
}

export interface Recipe {
    name: string;
    time: string;
    steps: string[];
    img_url: string;
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

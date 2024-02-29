export interface Category {
    id: string;
    name: string;
    alias: string;
}

export type CustomCategory = Partial<Category>
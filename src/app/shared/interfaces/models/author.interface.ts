export interface Author {
    name: string;
    books?: string[];
    birthDate: string;
    deathData: string;
    type: 'Author' | 'Translator' | 'Both'
}
export interface Author {
    name: string;
    books?: string[];
    language: string;
    birthDate: string;
    deathData: string;
    profession: 'Author' | 'Translator' | 'Both'
}
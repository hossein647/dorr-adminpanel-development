export interface Author {
    name: string;
    books?: string[];
    birthDate: string;
    deathData: string;
    profession: 'Author' | 'Translator' | 'Both';
    description: string;
}
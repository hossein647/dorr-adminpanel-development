import { Publication, PublicationLabel } from "./publication.interface";

export interface Article {     
    title?: string;
    content?: string;
    imageUrl?: string;
    tags?: string[];
    status?: Publication | PublicationLabel;

    category?: string
}
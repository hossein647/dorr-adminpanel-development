import { BookForm } from "./book-form.interface";
import { Book } from "./book.interface";

export interface BookData {
    public: BookForm;
    main: BookForm[];
    details: BookForm[];
    publish: BookForm[];
}
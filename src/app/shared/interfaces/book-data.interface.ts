import { BookForm } from "./book-form.interface";

export interface BookData {
    public: BookForm;
    main: BookForm[];
    details: BookForm[];
    publish: BookForm[];
}
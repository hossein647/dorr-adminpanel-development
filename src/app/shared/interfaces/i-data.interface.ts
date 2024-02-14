import { IForm } from "./i-form.interface";

export interface IData {
    public: IForm;
    main: IForm[];
    details: IForm[];
    publish: IForm[];
}
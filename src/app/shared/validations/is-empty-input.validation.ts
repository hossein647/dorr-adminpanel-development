import { FormGroup } from "@angular/forms"

export const isEmptyInput = (formGroup: FormGroup, formControlName: string): boolean => {
    const input = formGroup.controls[formControlName];
    return (input.invalid && (input.touched || input.dirty));
}
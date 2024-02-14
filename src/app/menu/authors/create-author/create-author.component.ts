import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect'; 
import { CrudService } from 'src/app/services/core/crud.service';
import { Author } from 'src/app/shared/interfaces';
import { isEmptyInput } from 'src/app/shared/validations';


@Component({
  selector: 'app-create-author',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, MultiSelectModule, ButtonModule],
  templateUrl: './create-author.component.html',
  styleUrl: './create-author.component.scss'
})
export class CreateAuthorComponent implements OnInit {


  authorForm: FormGroup;
  loading: boolean = false;
  authorData: any[];
  countries: [] = []
  

  constructor(
    private formBuilder: FormBuilder,
    private crudService: CrudService<Author>
  ) {}


  ngOnInit(): void {
    this.initForm();
    this.authorData = this.getAuthorData();
  }



  initForm() {
    this.authorForm = this.formBuilder.group({
      name: ['', Validators.required],
      birthDate: ['', Validators.required],
      deathDate: ['', Validators.required],
      book: [undefined],
    })
  }

  submitAuthor(authorForm: FormGroup) {
    console.log(authorForm.value);

    if (authorForm.invalid) return authorForm.markAllAsTouched();
    this.loading = true;

    
    
  }



  isEmptyInput(formControlName: string): boolean {
    return isEmptyInput(this.authorForm, formControlName)
  } 



  getAuthorData(): any[] {
    return [
      {
        label: 'نام :',
        formControlName: 'name',
        placeholder: 'نام نویسنده',
        for: 'name',
        id: 'name',
        error: 'فیلد نام را پر کنید.'
      },
      {
        label: 'سال تولد :',
        formControlName: 'birthDate',
        placeholder: 'سال تولد به عدد',
        for: 'birthDate',
        id: 'birthDate',
        error: 'فیلد سال تولد را پر کنید.'
      },
      {
        label: 'سال وفات :',
        formControlName: 'deathDate',
        placeholder: 'سال وفات به عدد',
        for: 'deathDate',
        id: 'deathDate',
        error: 'فیلد سال وفات را پر کنید.'
      },
    ]
  }
}

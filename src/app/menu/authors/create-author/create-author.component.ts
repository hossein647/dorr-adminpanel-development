import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect'; 
import { isEmptyInput } from 'src/app/shared/validations/empty.validation';

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
      book: [undefined, Validators.required],
    })
  }

  submitAuthor(authorForm: FormGroup) {}



  isEmptyInput(formControlName: string): boolean {
    return isEmptyInput(this.authorForm, formControlName)
  } 



  getAuthorData(): any[] {
    return [
      {
        formControlName: 'name',
        placeholder: 'نام نویسنده',
        for: 'name',
        id: 'name',
      },
      {
        formControlName: 'birthDate',
        placeholder: 'سال تولد',
        for: 'birthDate',
        id: 'birthDate',
      },
      {
        formControlName: 'deathDate',
        placeholder: 'سال وفات',
        for: 'deathDate',
        id: 'deathDate',
      },
    ]
  }
}

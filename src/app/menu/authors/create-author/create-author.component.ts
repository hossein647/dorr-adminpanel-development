import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MultiSelectModule } from 'primeng/multiselect'; 
import { CrudService } from 'src/app/services/core/crud.service';
import { Author } from 'src/app/shared/interfaces';
import { isEmptyInput } from 'src/app/shared/validations';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextareaModule } from 'primeng/inputtextarea';


@Component({
  selector: 'app-create-author',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, MultiSelectModule, ButtonModule, SelectButtonModule, InputTextareaModule],
  providers: [CrudService],
  templateUrl: './create-author.component.html',
  styleUrl: './create-author.component.scss'
})
export class CreateAuthorComponent implements OnInit {


  authorForm: FormGroup;
  loading: boolean = false;
  authorData: any[];
  countries: [] = []
  profession: any[];
  

  constructor(
    private formBuilder: FormBuilder,
    private crudService: CrudService<Author>
  ) {}


  ngOnInit(): void {
    this.initForm();
    this.authorData = this.getAuthorData();
    this.profession = [
      { label: 'نویسنده', value: 'author' }, 
      { label: 'مترجم', value: 'translator' },
      { label: 'هر دو', value: 'both' }, 
    ]
  }



  initForm() {
    this.authorForm = this.formBuilder.group({
      name: ['', Validators.required],
      birthDate: ['', Validators.required],
      deathDate: ['', Validators.required],
      books: [undefined],
      profession: ['', Validators.required],
      description: [''],
    })
  }

  submitAuthor(authorForm: FormGroup) {
    if (authorForm.invalid) return authorForm.markAllAsTouched();
    this.loading = true;
    const endPoint = 'author/create';
    console.log(authorForm.value);
    this.crudService.create(authorForm.value, endPoint, { withCredentials: true }).subscribe({
      next: (res: any) => {
        this.loading = false;
        console.log(res);
        
      },
      error: (err: any) => {
        this.loading = false;
        console.log(err);
        
      }
    })

    
  }



  isEmptyInput(formControlName: string): boolean {
    return isEmptyInput(this.authorForm, formControlName)
  } 



  getAuthorData(): any[] {
    return [
      {
        label: 'نام :',
        formControlName: 'name',
        placeholder: 'نام نویسنده یا مترجم',
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

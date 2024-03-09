import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { IData } from 'src/app/shared/interfaces/i-data.interface';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CrudService } from 'src/app/services/core/crud.service';
import { Author, Book } from 'src/app/shared/interfaces';


@Component({
  selector: 'app-create-book',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, CommonModule, ButtonModule, TabViewModule, DropdownModule, SelectButtonModule],
  providers: [CrudService],
  templateUrl: './create-book.component.html',
  styleUrl: './create-book.component.scss'
})
export class CreateBookComponent {

  bookForm: FormGroup;
  bookData: IData;
  loading: boolean = false;
  selectedCountry: string | undefined;
  authors: Author[] = [];





  constructor(
    private foromBuilder: FormBuilder,
    private crudService: CrudService<Book>,
  ) { }

  ngOnInit(): void {
    this.initilizeForm();
    this.bookData = this.setBookData();
    this.getAuthors();
  }



  initilizeForm() {
    this.bookForm = this.foromBuilder.group({
      name: ['', Validators.required],
      author: [this.selectedCountry, Validators.required],
      translator: [this.selectedCountry, Validators.required],
      category: [this.selectedCountry, Validators.required],
      language: [this.selectedCountry, Validators.required],
      volume: [null, Validators.required],
      page: [null, Validators.required],
      publisher: ['', Validators.required],
      publish_age: [null, Validators.required],
      publish_n: [null, Validators.required],
      imageUrl: ['', Validators.required],
    })
  }



  submitBook(bookForm: FormGroup) {
    console.log(bookForm.value);
    this.loading = true;
  }



  isEmptyInput(formControlName: string): boolean {
    const control = this.bookForm.controls[formControlName];
    return (control.invalid && (control.touched || control.dirty))
  }

  

  getAuthors() {
    this.crudService.getAll('author/getAll', { withCredentials: true }).subscribe({
      next: (res: any) => {
        this.authors = res.data;
      },
      error: (err: any) => {
        console.log(err);
      }
    });
  }



  setBookData(): IData {
    return {
      public: {
        type: 'text',
        class: 'p-inputtext p-inputtext-sm md:p-inputtext-lg w-full md:w-4/5 md:block m-1',
        directive: 'pInputText',
        formControlName: ''
      },
      main: [
        {
          formControlName: 'name',
          placeholder: 'صحیح بخاری',
          class: '',
          ngClass: '',
          for: 'name',
          id: 'name',
          title: 'نام :',
          error: 'فیلد نام را پر کنید.',
        },
        {
          formControlName: 'author',
          placeholder: 'انتخاب نویسنده',
          class: '',
          ngClass: 'w-full',
          for: 'author',
          id: 'author',
          title: 'مولف :',
          error: 'فیلد مولف را انتخاب کنید.',
        },
        {
          formControlName: 'translator',
          placeholder: 'انتخاب مترجم',
          class: '',
          ngClass: 'w-full',
          for: 'translator',
          id: 'translator',
          title: 'مترجم :',
          error: 'فیلد مترجم را انتخاب کنید.',
        },
      ],
      details: [
        {
          formControlName: 'category',
          placeholder: 'انتخاب دسته بندی',
          class: '',
          ngClass: '',
          for: 'category',
          id: 'category',
          title: 'دسته بندی :',
          error: 'فیلد دسته بندی را انتخاب کنید.',
        },
        {
          formControlName: 'page',
          placeholder: '600',
          class: '',
          ngClass: '',
          for: 'page',
          id: 'page',
          title: 'صفحات :',
          error: 'فیلد صفحات را پر کنید.',
        },
        {
          formControlName: 'volume',
          placeholder: '4',
          class: '',
          ngClass: '',
          for: 'volume',
          id: 'volume',
          title: 'تعداد جلد :',
          error: 'فیلد تعداد جلد را پر کنید.',
        },
        {
          formControlName: 'imageUrl',
          placeholder: 'تصویر',
          class: '',
          ngClass: '',
          for: 'imageUrl',
          id: 'imageUrl',
          title: 'تصویر :',
          error: 'فیلد تصویر را پر کنید.',
        },
      ],
      publish: [
        {
          formControlName: 'publisher',
          placeholder: 'دمشق',
          class: '',
          ngClass: '',
          for: 'publisher',
          id: 'publisher',
          title: 'ناشر :',
          error: 'فیلد ناشر را پر کنید.',
        },
        {
          formControlName: 'publish_age',
          placeholder: '1396',
          class: '',
          ngClass: '',
          for: 'publish_age',
          id: 'publish_age',
          title: 'سال انتشار :',
          error: 'فیلد سال انتشار را پر کنید.',
        },
        {
          formControlName: 'publish_n',
          placeholder: 'پنجم',
          class: '',
          ngClass: '',
          for: 'publish_n',
          id: 'publish_n',
          title: 'چاپ :',
          error: 'فیلد چاپ را پر کنید.',
        },
      ]
    }
  }
}

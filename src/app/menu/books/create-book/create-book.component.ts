import { NgFor, NgIf, NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { BookData } from 'src/app/shared/interfaces/book-data.interface';

@Component({
  selector: 'app-create-book',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, NgFor, NgIf, NgClass, ButtonModule, TabViewModule],
  templateUrl: './create-book.component.html',
  styleUrl: './create-book.component.scss'
})
export class CreateBookComponent {

  bookForm: FormGroup;
  bookData: BookData;
  loading: boolean = false;






  constructor(
    private foromBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.initilizeForm();
    this.bookData = this.setBookData();
  }



  initilizeForm() {
    this.bookForm = this.foromBuilder.group({
      name: ['', Validators.required],
      author: ['', Validators.required],
      translator: ['', Validators.required],
      category: ['', Validators.required],
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
  }



  loadSubmit() {
    this.loading = true;
  }


  setBookData(): BookData {
    return {
      public: {
        type: 'text',
        class: 'p-inputtext p-inputtext-sm md:p-inputtext-lg w-full md:w-4/5 lg:w-3/5 xl:w-1/2 md:block m-1',
        directive: 'pInputText',
        formControlName: null
      },
      main: [
        {
          formControlName: 'name',
          placeholder: 'صحیح بخاری',
          class: '',
          ngClass: '',
          for: 'name',
          id: 'name',
          title: 'نام :'
        },
        {
          formControlName: 'author',
          placeholder: 'محمد بن اسماعیل بخاری',
          class: '',
          ngClass: '',
          for: 'author',
          id: 'author',
          title: 'مولف :'
        },
        {
          formControlName: 'translator',
          placeholder: 'محمد هروی',
          class: '',
          ngClass: '',
          for: 'translator',
          id: 'translator',
          title: 'مترجم :'
        },
      ],
      details: [
        {
          formControlName: 'category',
          placeholder: 'حدیث',
          class: '',
          ngClass: '',
          for: 'category',
          id: 'category',
          title: 'دسته بندی :'
        },
        {
          formControlName: 'page',
          placeholder: '600',
          class: '',
          ngClass: 'mb-[2px] sm:m-1',
          for: 'page',
          id: 'page',
          title: 'صفحات :'
        },
        {
          formControlName: 'volume',
          placeholder: '4',
          class: '',
          ngClass: 'mt-[2px] sm:m-1',
          for: 'volume',
          id: 'volume',
          title: 'تعداد جلد :'
        },
        {
          formControlName: 'imageUrl',
          placeholder: 'تصویر',
          class: '',
          ngClass: '',
          for: 'imageUrl',
          id: 'imageUrl',
          title: 'تصویر :'
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
          title: 'ناشر :'
        },
        {
          formControlName: 'publish_age',
          placeholder: '1396',
          class: '',
          ngClass: '',
          for: 'publish_age',
          id: 'publish_age',
          title: 'سال انتشار :'
        },
        {
          formControlName: 'publish_n',
          placeholder: 'پنجم',
          class: '',
          ngClass: '',
          for: 'publish_n',
          id: 'publish_n',
          title: 'چاپ :'
        },
      ]
    }
  }
}

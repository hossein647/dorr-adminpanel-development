import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TabViewModule } from 'primeng/tabview';
import { IData } from 'src/app/shared/interfaces/i-data.interface';
import { DropdownModule } from 'primeng/dropdown';
import { SelectButtonModule } from 'primeng/selectbutton';
import { Author, Book, Category } from 'src/app/shared/interfaces';
import { BookService } from 'src/app/shared/services/book.service';
import { firstValueFrom, lastValueFrom } from 'rxjs';
import { CategoryService } from 'src/app/shared/services/category.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-create-book',
  standalone: true,
  imports: [ReactiveFormsModule, InputTextModule, CommonModule, ButtonModule, TabViewModule, DropdownModule, SelectButtonModule],
  providers: [BookService, MessageService],
  templateUrl: './create-book.component.html',
  styleUrl: './create-book.component.scss'
})
export class CreateBookComponent {

  bookForm: FormGroup;
  bookData: IData;
  loading: boolean = false;
  selectedCountry: string | undefined;
  authors: Author[] = [];
  categories: Category[] = [];
  imageFile: File;
  labelSelectImage: string = 'انتخاب تصویر';




  constructor(
    private foromBuilder: FormBuilder,
    private bookService: BookService<Book>,
    private categoryService: CategoryService<Category>,
    private messageService: MessageService,
  ) { }


  ngOnInit(): void {
    this.initilizeForm();
    this.bookData = this.setBookData();
    this.getAuthors();
    this.getCategories();
  }



  initilizeForm() {
    this.bookForm = this.foromBuilder.group({
      name: ['', Validators.required],
      author: [this.selectedCountry, Validators.required],
      translator: [this.selectedCountry, Validators.required],
      category: [this.selectedCountry, Validators.required],
      language: [this.selectedCountry, Validators.required],
      volumes: [null, Validators.required],
      pages: [null, Validators.required],
      publisher: ['', Validators.required],
      publish_age: [null, Validators.required],
      publish_n: [null, Validators.required],
      imageUrl: [null, Validators.required],
    })
  }



  prepareBookForm(imageUrl: string) {
    const { author, category, translator, ...result } = this.bookForm.value;
    this.bookForm.patchValue({
      ...result,
      author: author.id,
      category: category.id,
      translator: translator.id,
      pages: +this.bookForm.value.pages,
      publish_age: +this.bookForm.value.publish_age,
      volumes: +this.bookForm.value.volumes,
      imageUrl
    });
    return this.bookForm.value;
  }



  submitBook(bookForm: FormGroup) {
    if (bookForm.invalid) return bookForm.markAllAsTouched();
    
    this.loading = true;

    const imageUploadEndPoint = 'book/upload-image';
    const createBookEndPoint  = 'book/create';
    
    this.bookService.imageUpload(this.imageFile, imageUploadEndPoint, true).subscribe({
      next: (res: any) => {
        if (res.statusCode === 200) {
          const bookForm = this.prepareBookForm(res.imageUrl);
          
          this.bookService.create(bookForm, createBookEndPoint, true).subscribe({
            next: (res: any) => {
              this.loading = false;
              this.messageService.add({ severity: 'success', summary: res.message });
              this.bookForm.reset();
            },
            error: (err: any) => {
              this.loading = false;
              this.messageService.add({ severity: 'error', summary: err.error.message });
            }
          })
        }
        
      },
      error: (err: any) => {
        console.log('errr image upload : ', err);
        
      }
    })
  }



  isEmptyInput(formControlName: string): boolean {
    const control = this.bookForm.controls[formControlName];
    return (control.invalid && (control.touched || control.dirty))
  }

  

  async getAuthors() {
    const request = this.bookService.getAll<Author>('author/getAll', false);
    const response: any = await lastValueFrom(request);
    this.authors = response.data;
  }



  async getCategories() {
    const request = this.categoryService.getAll('category/getAll', false);
    const response: any = await (firstValueFrom(request));    
    this.categories = response.data;
  }

  
  onSelectImage(event: any) {        
    if (event.target.files.length) {
      this.imageFile = event.target.files[0];
      this.bookForm.patchValue({ imageUrl: this.imageFile.name });
      this.labelSelectImage = this.imageFile.name;
    }
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
          formControlName: 'pages',
          placeholder: '600',
          class: '',
          ngClass: '',
          for: 'pages',
          id: 'pages',
          title: 'صفحات :',
          error: 'فیلد صفحات را پر کنید.',
        },
        {
          formControlName: 'volumes',
          placeholder: '4',
          class: '',
          ngClass: '',
          for: 'volumes',
          id: 'volumes',
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

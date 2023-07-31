import { AfterViewInit, Component, OnInit, ViewChild, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { InputTextModule } from 'primeng/inputtext';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { InputSwitchModule } from 'primeng/inputswitch';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChipModule } from 'primeng/chip';
import { ButtonModule } from 'primeng/button';
import { ArticleService } from '../article.service';
import { Article } from 'src/app/shared/interfaces/article.interface';
import { DropdownModule } from 'primeng/dropdown';
import { MessageService } from 'primeng/api';
import { CategoryService } from '../../category/category.service';
import { Category } from 'src/app/shared/interfaces/category.interface';
import { ToastModule } from 'primeng/toast';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { BlockUIModule } from 'primeng/blockui';
import { Publication } from 'src/app/shared/interfaces/publication.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-post',
  standalone: true,
  imports: [
      CommonModule, 
      EditorModule, 
      InputTextModule, 
      FileUploadModule, 
      InputSwitchModule,
      FormsModule,
      ChipModule,
      ButtonModule,
      DropdownModule,
      ToastModule,
      ProgressSpinnerModule,
      BlockUIModule,
      ReactiveFormsModule
    ],
    providers: [
      { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' },
      MessageService
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.scss']
})
export class NewArticleComponent implements OnInit, AfterViewInit {


  showCancelSelectImage: boolean = false;
  tags: string[] = [];
  categories: Category[];
  selectedCategory: Category;
  imageUrl: string;
  articleId: string;
  blockedPage: boolean = false;
  chooseInputFile: HTMLInputElement;
  invalidImageSelected: boolean = false;
  articleForm: FormGroup;
  tinymceParent: HTMLDivElement;
  @ViewChild('fileUpload') fileUpload: FileUpload;
  categoryController: AbstractControl;
  

  constructor(
    private articleService: ArticleService,
    private categoryService: CategoryService,
    private messageService: MessageService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) {}


  onGetContentTinyEditor(event: any) {
    this.tinymceParent =  event.editor.editorContainer;
    const contentEditor = this.articleForm.controls?.['content'];

    contentEditor.statusChanges.subscribe(value => {
      if (contentEditor.status === 'VALID') {
        this.tinymceParent.classList.remove('invalid-tinymce');
      } else {
          this.tinymceParent.classList.add('invalid-tinymce');
      }
    })
  }



  ngAfterViewInit(): void {  
    this.chooseInputFile = this.fileUpload.basicFileInput?.nativeElement.parentNode;
  }



  ngOnInit(): void {    
    this.initilaizeArticleForm();    
    this.getCategories()
    const { _id: id, title, content, category, status, tags, imageUrl } = history.state;
    this.articleId = id;    

    // edit route
    if (this.articleId) {
      const statusState = status === 'منتشر شده' ? true : false;
      this.articleForm.patchValue({ id, title, content, status: statusState, category: category.name });
      this.tags = tags;
      this.articleForm.controls['tags'].clearValidators();
      this.imageUrl = imageUrl;
      this.getDirectImage(imageUrl); 
      this.showCancelSelectImage = true;
    }
  }



  initilaizeArticleForm() {    
    this.articleForm = this.formBuilder.group({
      title: ['', Validators.required],
      imageUrl: [''],
      content: ['', Validators.required],
      status: [false],
      tags: [[], Validators.required],
      category: ['', Validators.required],
    })
  }



  getCategories() {
    this.categoryService.getAll().subscribe({
      next: (res: any) => {        
        this.categories = res.data.categories;
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: err.error.message })
      }
    })
  }



  onSelectImage(event: any) {    
    const imageFile = event.currentFiles[0];
    this.articleForm.controls['imageUrl'].setValue(imageFile)
    
    this.showCancelSelectImage = true;
    this.removeClass(this.chooseInputFile, 'invalid-fileupload');
  }



  onClearSelectImage() {
    this.fileUpload.clear()
    this.showCancelSelectImage = false;    
    this.addClass(this.chooseInputFile, 'invalid-fileupload');
  }



  addTag(event: any, input: HTMLInputElement) {
    const isPinterEvent = event instanceof PointerEvent;
    const Enter = event.code === 'Enter';
    const NumpadEnter = event.code === 'NumpadEnter';    
    const maximumTag = this.tags?.length <= 2;
    
    if (input.value && maximumTag && (Enter || NumpadEnter || isPinterEvent)) {
      this.tags.push(input.value)
      input.value = '';
    }
  }



  removeTag(tags: string[], index: number) {
    tags.splice(index, 1); // sort this line important
    const tagsControl = this.articleForm.controls['tags']; 
    if (!tags.length) tagsControl.setErrors({ requird: true });
  }



  getDataArticle(imageUrl: string) {
    const formValue = this.articleForm.value;
    const statusSwitcher = this.articleForm.controls['status'];
    const statusValue = statusSwitcher.value ? Publication.PUBLISH : Publication.UNPUBLISH
    const categoryName = this.articleForm.controls['category'].value;

    const article: Article = {
      ...formValue,
      imageUrl: imageUrl ? imageUrl : this.imageUrl,
      status: statusValue,
      tags: this.tags,
      category: this.getIdCategory(categoryName)[0]
    }
    return article;
  }



  saveArticle(fileUpload: any) {
    const imageSelected = this.articleForm.controls['imageUrl'].value;
    const contentEditor = this.articleForm.controls['content'].value;
    const isImageSelected = imageSelected || fileUpload.files?.length;
    
    
    if (this.articleForm.valid && isImageSelected) {
      
      // call upload file button(event) 
      fileUpload.uploadHandler.emit(fileUpload.files); 
      
      // block page with loader
      this.blockedPage = true 
      
      // upload image to liara
      this.articleService.uploadImage(imageSelected).subscribe({ 
        next: (res: any) => {
          const article: Article = this.getDataArticle(res.data.imageUrl);
          
          // upload all part of article together imageUrl to server
          this.articleService.create(article).subscribe({
              next: (res: any) => {                
                this.blockedPage = false;
                this.messageService.add({ severity: 'success', summary: res.message });
                setTimeout(() => {
                  this.router.navigate(['dashboard/articles']);
                }, 500);
              },
              error: (err: any) => {
                this.blockedPage = false;
                this.messageService.add({ severity: 'error', summary: err.error.message });
              }
            });
        },
        error: (err) => {
          this.blockedPage = false;
          this.messageService.add({ severity: 'error', summary: err.error.message })
        }
      })
      
    } else {
     this.setErrorArticleForm(imageSelected, contentEditor);
    }
  }


  
  updateArticle() {
    this.blockedPage = true;
    const article: Article = this.getDataArticle(this.imageUrl);

    this.articleService.update(this.articleId, article).subscribe({
      next: (res: any) => {
        this.blockedPage = false;
        this.messageService.add({ severity: 'success', summary: res.message });
        setTimeout(() => {
          this.router.navigate(['dashboard/articles'])
        }, 500);
      },
      error: (err: any) => {
        this.blockedPage = false;
        this.messageService.add({ severity: 'error', summary: err.error.message })
      }
    });
  }



  setErrorArticleForm(imageSelected: string, contentEditor: string) {
    if (!imageSelected) {
      this.addClass(this.chooseInputFile, 'invalid-fileupload');
    }

    if (!contentEditor) {
      this.addClass(this.tinymceParent, 'invalid-tinymce');
    }
    this.articleForm.markAllAsTouched(); // for all exclusive image input && tinymce
  }



  isEmpty(formControlName: string) {    
    const input = this.articleForm?.controls[formControlName];
    return input?.invalid && (input?.dirty || input?.touched)
  }



  // load image on edit route
  async getDirectImage(imageUrl: string) {
    const indexSlash = imageUrl.lastIndexOf('/');
    const filename = imageUrl.slice(indexSlash + 1);

    this.articleService.getDirectImage(imageUrl).subscribe({
      next: (res: Blob | any) => {        
        const file = new File([res], filename);

        this.fileUpload.files.push(file);
        this.fileUpload.cd.detectChanges();
        this.articleForm.controls['imageUrl'].setValue(file);
      }, 
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: err.error.message })
      }
    });
  }



  getInvalidElement(el: HTMLElement, className: string): boolean {
    return el?.classList.contains(className);
  }



  removeClass(el: any, className: string) {
    if (this.getInvalidElement(el, className)) {
      el.classList.remove(className);
      this.invalidImageSelected = false;
    }
  }
  

  
  addClass(el: any, className: string) {    
    if (!this.getInvalidElement(el, className)) {
      el?.classList.add(className);
      this.invalidImageSelected = true;
    }
  }



  getIdCategory(categoryName: string) {
    return this.categories.filter(category => category.name === categoryName)
  }


  cancel() {
    this.router.navigate(['dashboard/articles'])
  }
}

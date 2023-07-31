import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService } from '../category.service';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/shared/interfaces/category.interface';
import { MessageService } from 'primeng/api';
import { FormComponent } from 'src/app/shared/component/form/form.component';
import { NgModel } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-new-category',
  standalone: true,
  imports: [CommonModule, FormComponent],
  providers: [MessageService],
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewCategoryComponent implements OnInit, AfterViewInit, OnDestroy {

  categoryName: string;
  categoryId: string;
  categoryRef: NgModel;
  subscription: Subscription;
  title: string;
  labelSubmit: string;
  @ViewChild(FormComponent) fromComponent: FormComponent;


  constructor(
    private categoryService: CategoryService,
    private messageService: MessageService,
    private router: Router,
    private activatedRotue: ActivatedRoute,
  ) {
    
  }


  ngOnInit(): void {
    this.getParamsFromUrl();
  }
  


  ngAfterViewInit(): void {
    this.categoryRef = this.fromComponent.formRef;    
  }



  async makeRequest(event: MouseEvent | KeyboardEvent) {        
    const keyboardEvent = event instanceof KeyboardEvent;
    const mouseEvent = event instanceof MouseEvent;
    const enter = keyboardEvent && (event.code === 'Enter' || event.code === 'NumpadEnter');    
    const input: HTMLInputElement = event.target as HTMLInputElement;
    const category: Category = { name: this.categoryName, _id: this.categoryId}

      if (this.categoryName && (mouseEvent || enter)) {
        if (this.categoryId) this.updateCategory(category);
        else {
          this.createCategory();
          input.blur();
        }
      } else {
        this.categoryRef.control.markAsTouched();
      }
    }



  async createCategory() {
    this.categoryService.create(this.categoryName).subscribe({
      next: (res: any) => {
        if (res.statusCode === 201) {
          this.messageService.add({ severity: 'success', summary: res.message });
          this.categoryRef.control.reset();
          setTimeout(() => {
            this.router.navigate(['dashboard/categories']);
          }, 1000);
        }
      },
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: err.error.message });
      }
    })
  }



  async updateCategory(category: Category) {
    this.categoryService.update(category).subscribe({
      next: (res: any) => {        
        if (res.statusCode === 200) {
          this.messageService.add({ severity: 'success', summary: res.message })
          setTimeout(() => {
            this.router.navigate(['dashboard/categories']);
          }, 1000);
        }
      }, 
      error: (err) => {
        this.messageService.add({ severity: 'error', summary: err.error.message })
      }
    })
  }



  invalidForm() {    
    return this.categoryRef?.control.invalid && 
           (this.categoryRef?.control.touched || this.categoryRef?.control.dirty)
  }



  changeCategoryName(value: string) {
    this.categoryName = value;
  }



  getParamsFromUrl() {
    this.subscription = this.activatedRotue.queryParams.subscribe({
      next: (params: any) => {
        if (params.id) {
          this.categoryName = params.name;
          this.categoryId = params.id
          this.title = 'ویرایش دسته بندی'
          this.labelSubmit = 'آپدیت'
          
        } else {
          this.title = 'دسته بندی جدید';
          this.labelSubmit = 'ایجاد';
        }
      }
    })
  }


  // getCategoryId(): string {
  //   // return this.categories
  // }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}

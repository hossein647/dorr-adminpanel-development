import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CrudService } from 'src/app/services/core/crud.service';
import { Category } from 'src/app/shared/interfaces/models/category.interface';
import { MessageService } from 'primeng/api';
import { ToastComponent } from 'src/app/shared/component/toast/toast.component';

@Component({
  selector: 'app-create-category',
  standalone: true,
  imports: [InputTextModule, ButtonModule, ReactiveFormsModule, CommonModule, ToastComponent],
  providers: [CrudService, MessageService],
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.scss'
})
export class CreateCategoryComponent implements OnInit {
  
  
  categoryForm: FormGroup;
  loading: boolean = false;
  
  constructor(
    private foromBuilder: FormBuilder,
    private crudService: CrudService<Category>,
    private messageService: MessageService
  ) {}


  ngOnInit(): void {
    this.initialForm();
  }


  initialForm() {
    this.categoryForm = this.foromBuilder.group({
      name: ['', Validators.required],
      alias: ['', Validators.required],
    })
  }



  submitCategory(categoryForm: FormGroup) {
    if (categoryForm.invalid) return categoryForm.markAllAsTouched();

    const endPoint = 'category/create'
    this.loading = true;

    this.crudService.create(categoryForm.value, endPoint).subscribe({
      next: (res: any) => {
        this.loading = false;
        this.messageService.add({ severity: 'success', summary: res.message})
        this.categoryForm.reset();
      },
      error: (err: any) => {
        this.loading = false;
        this.messageService.add({ severity: 'error', summary: err.error.message })
      }
    })
  }


  isEmptyInput(formControlName: string): boolean {
    const input = this.categoryForm.controls[formControlName];    
    return (input.invalid && (input.touched || input.dirty))
  }
}

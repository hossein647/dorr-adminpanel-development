import { Component, OnInit } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CrudService } from 'src/app/services/core/crud.service';

@Component({
  selector: 'app-create-category',
  standalone: true,
  imports: [InputTextModule, ButtonModule, ReactiveFormsModule, CommonModule],
  providers: [CrudService],
  templateUrl: './create-category.component.html',
  styleUrl: './create-category.component.scss'
})
export class CreateCategoryComponent implements OnInit {
  
  
  categoryForm: FormGroup;
  loading: boolean = false;
  
  constructor(
    private foromBuilder: FormBuilder
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
    console.log(categoryForm.value);
    this.loading = true;
  }
}

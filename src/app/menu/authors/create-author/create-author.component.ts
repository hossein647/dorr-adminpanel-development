import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { isEmptyInput } from 'src/app/shared/validations/empty.validation';

@Component({
  selector: 'app-create-author',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './create-author.component.html',
  styleUrl: './create-author.component.scss'
})
export class CreateAuthorComponent implements OnInit {


  authorForm: FormGroup;
  

  constructor(
    private formBuilder: FormBuilder,
  ) {}


  ngOnInit(): void {}



  initForm() {}

  submitAuthor(authorForm: FormGroup) {}


  isEmptyInput(formControlName: string): boolean {
    return isEmptyInput(this.authorForm, formControlName)
  } 
}

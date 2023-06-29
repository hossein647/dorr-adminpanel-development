import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorModule, TINYMCE_SCRIPT_SRC } from '@tinymce/tinymce-angular';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';
import { ChipModule } from 'primeng/chip';
import { ButtonModule } from 'primeng/button';

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
    ],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }
  ],
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {


  checked: boolean = false;

  constructor() {}

  ngOnInit(): void {
    
  }


  onBasicUploadAuto(event: any) {
    console.log(event);
  }
}

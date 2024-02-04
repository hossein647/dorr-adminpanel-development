import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../shared/component/button/button.component';
import { AuthService } from './auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { firstValueFrom, map } from 'rxjs';
import { MessageService } from 'primeng/api';
import { ToastComponent } from '../shared/component/toast/toast.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, InputTextModule, ReactiveFormsModule, ButtonComponent, ToastComponent],
  providers: [MessageService],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  label: string;
  authForm: FormGroup;
  formTitle: string;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private messageSerivce: MessageService,
  ) { }


  ngOnInit(): void {
    this.detectTypeForm();
    this.initializeForm();
  }



  initializeForm() {
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }


  login(authForm: FormGroup) {
    if (authForm.valid) {
      this.authService.login(authForm.value).subscribe({
        next: (res: any) => {
          if (res) {
            this.messageSerivce.add({ severity: 'success', summary: res.message });
            setTimeout(() => {
              this.router.navigate(['dashboard'])
            }, 1000);
          }
        },
        error: (err) => {
          const error = err.error.message || 'خطایی رخ داده است';
          this.messageSerivce.add({ severity: 'error', summary: error });
        }
      })
    }
  }



  register(authForm: FormGroup) {
    if (authForm.valid) {
      this.authService.register(authForm.value).subscribe({
        next: (res: any) => {
          if (res.statusCode === 201) {
            this.messageSerivce.add({ severity: 'success', summary: res.message });
            setTimeout(() => {
              this.router.navigate(['auth/login'])
            }, 1000);
          }
        },
        error: (err) => {
          const error = err.error.message || 'خطایی رخ داده است';
          this.messageSerivce.add({ severity: 'error', summary: error });
        }
      })
    }
  }



  async detectTypeForm() {
    const urlPath = await firstValueFrom(this.activatedRoute.url);
    const url = urlPath[1].path;
    if (url === 'login') {
      this.label = 'ورود';
      this.formTitle = 'صفحه ورود';
    } else {
      this.label = 'عضویت';
      this.formTitle = 'صفحه عضویت';
    }
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm = this.form.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });

  constructor(private form: FormBuilder, private auth: AuthService, private router: Router) { }

  errorDiv: string = "";
  onSubmit() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      console.log(loginData);
      this.auth.logIn(loginData as User).subscribe({
        next: (response) => {
          console.log(response.token);
          localStorage.setItem("token", response.token);
          this.router.navigate(["/home"]);
        }, error: (error) => {
          console.log(error);
          this.errorDiv = error;
        }
      });
    }
  }
}

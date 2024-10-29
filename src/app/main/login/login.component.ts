import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { Router } from '@angular/router';
import { AppComponent } from '../../app.component';

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

  constructor(private form: FormBuilder, private auth: AuthService, private router: Router, private appCompo: AppComponent) { }

  errorDiv: string = "";
  onSubmit() {
    if (this.loginForm.valid) {
      const loginData = this.loginForm.value;
      
      this.auth.logIn(loginData as User).subscribe({
        next: (response) => {
          localStorage.setItem("token", response.token);
          this.appCompo.loggedIn = true;
          this.router.navigate(["/home"]);
        }, error: (error) => {
          
          this.errorDiv = "Felaktigt lösenord/användarnamn";
        }
      });
    }
  }
}

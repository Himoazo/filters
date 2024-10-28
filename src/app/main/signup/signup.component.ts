import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  registerForm = this.form.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(10),
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z]).*')
      ]
    ],
    email: ['', [Validators.required, Validators.email]]
  });

  constructor(private form: FormBuilder, private auth: AuthService) { }

  signUpErr: string = "";
  onSubmit(): void {
    console.log(this.registerForm.value);
    const newUser = this.registerForm.value;
    if (this.registerForm.valid) {
      console.log('Form Submitted!', this.registerForm.value);
      this.auth.signUp(newUser as User).subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (error) => {
          console.log(error);
          this.signUpErr = error;
        }
      });
    }
  }
}

import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  // Sign up form instans
  registerForm = this.form.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: [
      '',
      [
        Validators.required,
        Validators.minLength(10), //Lösenord måste vara minst 10 tecken
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z]).*') //Lösenord måste innehållar stora och små bokstäver
      ]
    ],
    email: ['', [Validators.required, Validators.email]]
  });

  constructor(private form: FormBuilder, private auth: AuthService, private _snackBar: MatSnackBar) { }

  signUpErr: string = ""; //Error div
  //Funktion för att registrera användare
  onSubmit(): void {
    const newUser = this.registerForm.value;
    if (this.registerForm.valid) {
      this.auth.signUp(newUser as User).subscribe({
        next: (response) => {
          this.openSnackBar("Kontot har skapats, nu kan du logga in");
        },
        error: (error) => {
          this.signUpErr = error.message;
          this.openSnackBar(error.message);
        }
      });
    }
  }

  //Pop up
  openSnackBar(message: string) {
    this._snackBar.open(message, "X", {
      duration: 5000
    });
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Token, User } from '../models/user';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //private url: string = "http://localhost:5258/api/account/";
  private url: string = "https://computervision-production.up.railway.app/api/account/"; //Länk till API
  
  constructor(private http: HttpClient) { }

  // Logga in
  logIn(user: User): Observable<Token>{
    return this.http.post<Token>(this.url + "login", user);
  }

  // Skapa konto
  signUp(newUser: User): Observable<any>{
    return this.http.post<User>(this.url + "register", newUser);
  }
}

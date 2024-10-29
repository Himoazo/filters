import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { windowWhen } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'filters';

  loggedIn: boolean = false;

  ngOnInit() {
    if (localStorage.getItem("token")) {
      this.loggedIn = true;
    } else {
      this.loggedIn = false;
    }
  }

  loggedInStatus(status: boolean): void {
    this.loggedIn = status;
  }

  //Logga ut
  logOut(): void{
    localStorage.removeItem("token");
    this.loggedIn = false;
    window.location.href = "/";
  }
}

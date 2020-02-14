import { Component } from '@angular/core';
import { AuthService } from './shared/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(public authService: AuthService, public router: Router) { }

  logout() {
    this.authService.doLogout()
  }
  profile() {
    this.router.navigate(['user-profile/'+this.authService.getId]);
  }
}
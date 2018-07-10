import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  title = 'app';
  isAuthenticated = false;

  constructor(private authService: AuthService) {

    this.authService.authState().subscribe(auth => {
      if (auth) {
        this.isAuthenticated = true;
      } else {
        this.isAuthenticated = false;
      }
    });

  }







}

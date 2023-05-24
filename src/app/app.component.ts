import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AppDentistryAdmin';

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    
  }

  isLoggedIn(): boolean {
    var token = localStorage.getItem("jwt");
    if (token != null) {
      return true;
    }
    else {
      return false;
    }
  }
}

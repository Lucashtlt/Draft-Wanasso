import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {AuthService} from './services/auth.service'


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  
  public title = 'Wanasso-LP';

  constructor(private auth: AuthService, private router: Router){
    
  };

  logout() {
    this.auth.logout();
    console.log('logout', localStorage.getItem("id_token"),
    localStorage.getItem("expires_at"))
    return this.router.navigate([''])
  }
  
} 

import { Component } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent{
  public logged_in: boolean = false;
  loading: boolean = false;

  constructor(
    private loginService: LoginService
  ){
    this.loading = true;
    if(this.loginService.getToken()){
      this.logged_in = true;
    }
    this.loading = false;
  }
}

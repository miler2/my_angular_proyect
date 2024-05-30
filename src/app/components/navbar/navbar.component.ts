import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent{
  public logged_in: boolean;
  loading: boolean = false;

  constructor(
    private loginService: LoginService
  ){
    this.loading = true;

    // Inicializa la variable
    if(this.loginService.getToken()){
      this.logged_in = true;
    } else {
      this.logged_in = false;
    }

    // Una vez iniciado el componente, si hay cambios, entonces me lo notifica y lo cambio.
    this.loginService.data$.subscribe(data => {
      if(data){
        this.logged_in = data;
      }
    })

    this.loading = false;
  }

  logOut(){
    this.loginService.logOut();
  }
}

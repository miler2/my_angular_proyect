import { Component } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent{
  public logged_in!: boolean;
  loading: boolean = false;

  constructor(
    private loginService: LoginService
  ){
    this.loading = true;

    // Compruebo si está iniciado en sesión, y cambio la variable correspondientemente
    if(this.loginService.getToken()){
      this.loginService.isUserLogedIn();
    } else {
      this.loginService.updateLogedIn(false);
    }

    this.loginService.data$.subscribe({
      next: (data) => {
        this.logged_in = data;  // La variable guardada antes la almacenamos localmente
      }
    });

    
    
    this.loading = false;
  }

  logOut(){
    this.loginService.logOut();
  }
}

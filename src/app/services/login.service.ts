import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private myApiUrl = environment.myBaseAppUrl;
  private loginUrl = '/login/';

  constructor(
    private http: HttpClient,
    private cookies: CookieService,
    private router: Router
  ) {}

  isUserLogedIn() {
    if(this.getToken()){
      this.router.navigate(['/']);
    }
  }

  login(user: User){
    return this.http.post(`${this.myApiUrl}${this.loginUrl}`, user);
  }

  setToken(token: string){
    this.cookies.set("token", token)
  }

  getToken(){
    return this.cookies.get("token");
  }

  verifyUser(){
    const token = this.getToken();
    return this.http.post(`${this.myApiUrl}${this.loginUrl}verifyToken`, token);
  }
}

import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

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

  private dataSubject = new BehaviorSubject<boolean>(false);
  data$ = this.dataSubject.asObservable();

  updateLogedIn(logedIn: boolean){
    this.dataSubject.next(logedIn);
  }

  // En cuanto a esto se refiere hay mucha redundancia en los archivos
  // Quiero cambiar esto luego, cuando arregle el problema del login
  isUserLogedIn(): boolean{
    if(this.getToken()){
      this.updateLogedIn(true);
      return true;
    } else {
      this.updateLogedIn(false);
      return false;
    }
  }

  setToken(token: string){
    this.cookies.set("token", token)
  }

  getToken(){
    return this.cookies.get("token");
  }

  // API
  login(user: User){
    return this.http.post(`${this.myApiUrl}${this.loginUrl}`, user);
  }

  verifyUser(){
    const token = this.getToken();
    return this.http.post(`${this.myApiUrl}${this.loginUrl}verifyToken`, token);
  }
}

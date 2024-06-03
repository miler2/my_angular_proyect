import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private myApiUrl = environment.myBaseAppUrl;
  private loginUrl = '/login/';

  constructor(
    private http: HttpClient,
    private cookies: CookieService
  ) {}

  private dataSubject = new BehaviorSubject<boolean>(false);
  data$ = this.dataSubject.asObservable();

  updateLogedIn(logedIn: boolean){
    this.dataSubject.next(logedIn);
  }

  // Si el usuario tiene un token válido, entonces está logeado
  isUserLogedIn(){
    this.verifyUser().subscribe({
      next: () => {
        this.updateLogedIn(true);
      },
      error: () => {
        this.updateLogedIn(false);
      }
    });
  }

  // API
  login(user: User): Observable<string>{
    return this.http.post<string>(`${this.myApiUrl}${this.loginUrl}`, user);
  }

  verifyUser(): Observable<boolean>{
    const token = this.getToken();
    const body = { token }; // Para poder pasarselo como JSON tengo que añadir esta línea ("body" es un json con el token)
    return this.http.post<boolean>(`${this.myApiUrl}${this.loginUrl}verifyToken`, body);
  }

  
  


  // COOKIES
  setToken(token: string){
    this.cookies.set("token", token);  // Hace el login creando un token
  }

  logOut(){
    this.cookies.delete("token"); // Hace log out eliminando el token
  }

  getToken(){
    return this.cookies.get("token"); // Obtiene el token de la página web (no está verificado)
  }
}

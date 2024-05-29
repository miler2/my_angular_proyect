// Ahora mismo no se está usando estas funciones en la API

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private myApiUrl = environment.myBaseAppUrl;
  private usuariosUrl = '/usuarios';

  constructor(private http: HttpClient) { }

  public getUser(nombre: string): Observable<User>{
    return this.http.get<User>(`${this.myApiUrl}${this.usuariosUrl}${nombre}`);
  }

  public addUser(user: User){
    return this.http.post(`${this.myApiUrl}${this.usuariosUrl}/add`, user);
  }
}

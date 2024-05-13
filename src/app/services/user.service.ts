import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  public getUser(nombre: string): Observable<User>{
    return this.http.get<User>(`${environment.my_api}/usuarios/${nombre}`);
  }

  public addUser(user: User){
    return this.http.post(`${environment.my_api}/usuarios/add`, user);
  }
}

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  token: string = '';
  constructor() { }

  login(email: string, contrasena: string){
    
  }
}

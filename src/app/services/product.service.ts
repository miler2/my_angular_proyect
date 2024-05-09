import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) { }

  public getProducts(){
    return this.http.get(`${environment.my_api}/productos`);
  }

  public getProduct(){
    return this.http.get(`${environment.my_api}/productos/:id`);
  }
}

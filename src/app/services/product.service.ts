import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Product } from 'src/app/interfaces/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {}

  public getProducts(){
    return this.http.get(`${environment.my_api}/productos`);
  }

  // Este aún no se ha implementado del todo.
  public addProduct(producto: Product){
    return this.http.post(`${environment.my_api}/productos/add`, producto);
  }

  public deleteProduct(id: number){
    return this.http.delete(`${environment.my_api}/productos/delete/${id}`);
  }
}

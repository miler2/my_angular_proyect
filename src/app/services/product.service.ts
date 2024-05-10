import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Product } from 'src/app/interfaces/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient) {}

  public getProducts(){
    return this.http.get(`${environment.my_api}/productos`);
  }

  public getProduct(id: number): Observable<Product>{
    return this.http.get<Product>(`${environment.my_api}/productos/${id}`);
  }

  public addProduct(producto: Product){
    return this.http.post(`${environment.my_api}/productos/add`, producto);
  }

  editProduct(id: number, producto: Product){
    return this.http.put(`${environment.my_api}/productos/${id}`, producto);
  }

  public deleteProduct(id: number){
    return this.http.delete(`${environment.my_api}/productos/delete/${id}`);
  }
}

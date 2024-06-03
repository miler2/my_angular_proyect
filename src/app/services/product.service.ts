import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Product } from 'src/app/interfaces/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private myApiUrl = environment.myBaseAppUrl;
  private productosUrl = '/productos/';

  constructor(private http: HttpClient) {}

  public getProducts(){
    return this.http.get(`${this.myApiUrl}${this.productosUrl}`);
  }

  public getProduct(id: number): Observable<Product>{
    return this.http.get<Product>(`${this.myApiUrl}${this.productosUrl}${id}`);
  }

  public addProduct(producto: Product){
    return this.http.post(`${this.myApiUrl}${this.productosUrl}add`, producto);
  }

  editProduct(id: number, producto: Product){
    return this.http.put(`${this.myApiUrl}${this.productosUrl}${id}`, producto);
  }

  public deleteProduct(id: number){
    return this.http.delete(`${this.myApiUrl}${this.productosUrl}delete/${id}`);
  }
}

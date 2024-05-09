import { Component, OnInit } from '@angular/core';
// import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit{
  public products: any;
  constructor(private apiService: ProductService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(){
    this.apiService.getProducts().subscribe(resp => {
      this.products = resp;
    })
  }
}

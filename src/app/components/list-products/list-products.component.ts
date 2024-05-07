import { Component } from '@angular/core';
import { Product } from 'src/app/interfaces/product';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent {
  listProducts: Product[] = [
    {
      id: 1,
      name: 'Coca Cola',
      description: 'Bebida con azucar',
      price: 10,
      stock: 200,
    },
    {
      id: 2,
      name: 'Corona',
      description: 'Bebida con alcohol',
      price: 3,
      stock: 300,
    },
  ]
  constructor() {}
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { ListProductsComponent } from './list-products/list-products.component';
import { AddEditProductComponent } from './add-edit-product/add-edit-product.component';



@NgModule({
  declarations: [
    NavbarComponent,
    ListProductsComponent,
    AddEditProductComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss']
})
export class AddEditProductComponent implements OnInit {
  form: FormGroup;
  constructor(private fb: FormBuilder, private apiService: ProductService) {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(20)]],
      descripcion: ['', Validators.required],
      price: ['', Validators.required],
      stock: ['', Validators.required],
    })
  }
  ngOnInit(): void {
    this.addProduct();
  }

  addProduct(){
    const product: Product = {
      nombre: this.form.value.name,
      descripcion: this.form.value.descripcion,
      price: this.form.value.price,
      stock: this.form.value.stock 
    }

    this.apiService.addProduct(product).subscribe(() => {
      console.log('Producto agregado correctamente')
    });
  }
}

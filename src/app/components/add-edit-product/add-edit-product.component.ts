import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Product } from 'src/app/interfaces/product';
import { LoginService } from 'src/app/services/login.service';
import { ProductService } from 'src/app/services/product.service';


@Component({
  selector: 'app-add-edit-product',
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.scss']
})
export class AddEditProductComponent implements OnInit{
  form: FormGroup;
  loading: boolean = false;
  id: number;
  titulo_pagina: string = 'Agregar ';
  logged_in: boolean = false;

  constructor(
    private fb: FormBuilder, 
    private apiService: ProductService,
    private router: Router,
    private toastr: ToastrService,
    private loginService: LoginService,
    private aRouter: ActivatedRoute
  ) {

    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.maxLength(20)]],
      descripcion: ['', Validators.required],
      precio: ['', Validators.required],
      stock: ['', Validators.required],
    })

    this.loading = true;
    
    /* Esta línea de abajo me genera una anomalía en la página. No tengo claro por qué, 
    pero creo que es porque otro componente ya está suscrito a ésto o algo. */
    // this.loginService.isUserLogedIn();  // Compruebo si está iniciado en sesión, y cambio la variable correspondientemente
    this.loginService.data$.subscribe({
      next: (data) => {
        this.logged_in = data;  // La variable guardada antes la almacenamos localmente
      }
    });
    
    this.loading = false;

    // aRouter.snapshot.paramMap.get('id'); esto captura la id del producto dado en la url de la página (para saber si estamos editando un producto, o añadiendo uno nuevo)
    this.id = Number(aRouter.snapshot.paramMap.get('id'));
  }

  ngOnInit(): void {
    if(this.id != 0){
      this.titulo_pagina = 'Editar ';
      this.getProduct(this.id);
    }
  }

  addProduct(){
    const product: Product = {
      nombre: this.form.value.nombre,
      descripcion: this.form.value.descripcion,
      precio: this.form.value.precio,
      stock: this.form.value.stock 
    }
    
    if(this.id != 0) {
      this.loading = true;
      product.id = this.id;

      this.apiService.editProduct(this.id, product).subscribe(() => {
        this.loading = false;
        this.toastr.success(`El producto ${product.nombre} fue modificado con exito`, 'Producto modificado');
        this.router.navigate(['/products']);
      });
    } else {
      this.loading = true;
      this.apiService.addProduct(product).subscribe(() => {
        this.loading = false;
        this.toastr.success(`El producto ${product.nombre} fue registrado con exito`, 'Producto registrado');
        this.router.navigate(['/products']);
      });
    }
  }

  getProduct(id: number) {
    this.loading = true;
    this.apiService.getProduct(id).subscribe((data: Product) => {
      // console.log(data);
      this.loading = false;

      // Cambiamos los valores del formulario para mostrar los datos del producto elegido
      this.form.setValue({
        nombre: data.nombre,
        descripcion: data.descripcion,
        precio: data.precio,
        stock: data.stock
      })
    })
  }
}

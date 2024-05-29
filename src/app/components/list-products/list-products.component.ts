import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr'; // toastr
// import { Product } from 'src/app/interfaces/product';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit{
  public products: any;
  loading: boolean = false;

  constructor(private apiService: ProductService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(){
    this.loading = true;

    // Si no hay respuesta del backend se queda cargando, hay que añadir una respuesta, que si en x tiempo no ha habido contacto, te mande un mensaje de error, o warning.
    this.apiService.getProducts().subscribe(resp => {
      this.products = resp;
      this.loading = false;
    })
  }

  deleteProduct(id: number){
    this.loading = true;
    this.apiService.deleteProduct(id).subscribe(() => {
      this.getAllProducts();
      this.toastr.warning('El producto ha sido eliminado con éxito', 'Producto eliminado');
      this.loading = false; // Esto lo he añadido porque creo que faltaba, si hay un error con la barra, es por esta línea
    });
  }
}

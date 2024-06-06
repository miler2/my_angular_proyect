import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.scss']
})
export class ListProductsComponent implements OnInit{
  products: any;
  loading: boolean = false;
  logged_in: boolean = false;

  constructor(
    private apiService: ProductService,
    private toastr: ToastrService,
    private loginService: LoginService
  ){
    this.loading = true;

    /* if(this.loginService.getToken()){ // En el caso en el que haya algo en la variable token del navegador, miramos si es válido o no e inicializamos la variable.
      this.loginService.isUserLogedIn();
    } else {
      this.loginService.updateLogedIn(false);
    } */
    
    /* Esta línea de abajo me genera una anomalía en la página. No tengo claro por qué, 
    pero creo que es porque otro componente ya está suscrito a ésto o algo. */
    // this.loginService.isUserLogedIn();  // Compruebo si está iniciado en sesión, y cambio la variable correspondientemente
    this.loginService.data$.subscribe({
      next: (data) => {
        this.logged_in = data;  // La variable guardada antes la almacenamos localmente
      }
    });
    
    this.loading = false;
  }


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

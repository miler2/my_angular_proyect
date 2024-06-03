import { NgModule } from '@angular/core';

// Servicios
import { CookieService } from 'ngx-cookie-service';

// Modulos
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ComponentsModule } from './components/components.module';

// Componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ListProductsComponent } from './components/list-products/list-products.component';
import { AddEditProductComponent } from './components/add-edit-product/add-edit-product.component';
import { ProgressBarComponent } from './shared/progress-bar/progress-bar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

// Toastr
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ListProductsComponent,
    AddEditProductComponent,
    ProgressBarComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    BrowserAnimationsModule, // required animations module

    // Dependencia para toastr. Aquí, dentro de "forRoot()" se le pasa algunas condiciones para modificar (como css)
    ToastrModule.forRoot({
      timeOut: 10000,
      positionClass: 'toast-bottom-right',
      preventDuplicates: true,
    }), // ToastrModule (es para las alertas)
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }

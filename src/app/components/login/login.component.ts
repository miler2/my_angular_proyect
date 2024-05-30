import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{
  form: FormGroup;
  loading: boolean = false;
  
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private loginService: LoginService,
    private router: Router
  ){
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.maxLength(40)]],
      contrasena: ['', [Validators.required, Validators.maxLength(50)]],
    });


    if(this.loginService.getToken()){
      this.loginService.updateLogedIn(true);
      this.router.navigate(['/']);
    } else {
      this.loginService.updateLogedIn(false);
    }
  }

  login(){
    this.loading = true;
    const user = {
      email: this.form.value.email,
      contrasena: this.form.value.contrasena
    };

    // Dentro de esta función no puedo usar "this", por lo que he usado "that" así:
    const that = this;
    const observer = {
      next(data: any) {
        that.loading = true;
        that.loginService.setToken(data.token);

        // Hago un timeout para que le de tiempo al Token a guardarse en el navegador antes de recargar la página
        setTimeout(() => {
          if (that.loginService.isUserLogedIn()){
            that.toastr.success('Login realizado con éxito');
            that.router.navigate(['/']);
          } else {
            that.toastr.warning('Intente recargar la página', 'Ha habido un error');
          }
        }, 100);  // 400 es posible
      },
      error(error: any) {
        console.log(error);
        that.toastr.error('Email o contraseña incorrectos', 'Error');
      }
    };
    this.loginService.login(user).subscribe(observer);

    // this.loading = false;
  }
}
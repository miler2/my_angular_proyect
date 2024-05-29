import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { timeout } from 'rxjs';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
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
  }

  ngOnInit(): void {
    this.loginService.isUserLogedIn();  // Si hay un token, entonces devuelve a la página principal.
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
          that.toastr.success('Login realizado con éxito');
          that.router.navigate(['/']);
        }, 500);
      },
      error(error: any) {
        console.log(error);
        that.toastr.error('Email o contraseña incorrectos', 'Error');
      }
    };
    this.loginService.login(user).subscribe(observer);

    this.loading = false;
  }
}
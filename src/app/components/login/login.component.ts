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
  loading: boolean;
  
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

    this.loading = true;
    this.loginService.data$.subscribe({
      next: (data) => {
        if(data == true){
          this.router.navigate(['/']);
        }
      }
    });
    this.loading = false;
  }

  login(){
    this.loading = true;
    // let token: string;
    const user = {
      email: this.form.value.email,
      contrasena: this.form.value.contrasena
    };

    // Guardamos en la variable token el valor del token que nos da la función
    this.loginService.login(user).subscribe(
      data => {
        const token = (data as any).token;
        this.loginService.setToken(token);
        this.loginService.updateLogedIn(true);
      }
    );
    /* setTimeout(() => {
      try {
        this.toastr.success('Login realizado con éxito');
        this.router.navigate(['/']);
      } catch (error) {
        this.toastr.warning('Intente recargar la página', 'Ha habido un error');
      }
    }, 100); */
  }
}
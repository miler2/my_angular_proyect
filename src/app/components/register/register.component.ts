import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/user';
import { LoginService } from 'src/app/services/login.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  form: FormGroup;
  loading: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private apiService: UserService,
    private toastr: ToastrService,
    private router: Router,
    private loginService: LoginService
  ){
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.maxLength(40), Validators.email]],
      nombre_usuario: ['', [Validators.required, Validators.maxLength(15)]],
      contrasena: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(5)]],
      repetir_contrasena: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(5)]],
    });

    this.loginService.isUserLogedIn();  // Compruebo si está iniciado en sesión, y cambio la variable correspondientemente
    this.loginService.data$.subscribe({
      next: (data) => {
        if(data == true){
          this.router.navigate(['/']);
        }
      }
    });
  }

  addUser(){
    const user: User = {
      email: this.form.value.email,
      nombre_usuario: this.form.value.nombre_usuario,
      contrasena: this.form.value.contrasena
    }
    
    if (user.contrasena == this.form.value.repetir_contrasena) {
      try {

        this.loading = true;
        this.apiService.addUser(user);
        this.toastr.success(`Se ha registrado correctamente`);
        this.router.navigate(['/']);

      }catch(error){
        // console.log(error); // Debugging
        this.toastr.error(`No se ha podido añadir el usuario correctamente`, `Error`);
      }
    } else {
      this.toastr.error(`Las contraseñas tienen que coincidir`);
    }
  }
}

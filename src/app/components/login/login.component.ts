import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    private apiService: UserService,
    private toastr: ToastrService
  ){
    this.form = this.formBuilder.group({
      nombre_usuario: ['', [Validators.required, Validators.maxLength(15)]],
      contrasena: ['', [Validators.required, Validators.maxLength(50)]],
    });
  }

  checkUser(){
    this.apiService.getUser(this.form.value.nombre_usuario).subscribe((data: User) => {
      
      try {
        if (data.nombre_usuario && this.form.value.contrasena == data.contrasena) {
          this.toastr.success(`${data.nombre_usuario}, ${data.contrasena}`, 'Usuario:');
        } else {
          this.toastr.warning(`Usuario o contraseña son incorrectos`, `Error de inicio de sesión`)
        }
      } catch (error) {
        console.log(error);
        this.toastr.warning(`Usuario o contraseña son incorrectos`, `Error de inicio de sesión`)
      }
      
    })
  }
}

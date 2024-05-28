import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

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
    private apiService: UserService,
    private toastr: ToastrService,
    private router: Router
  ){
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.maxLength(40)]],
      // nombre_usuario: ['', [Validators.required, Validators.maxLength(15)]],
      contrasena: ['', [Validators.required, Validators.maxLength(50)]],
    });
  }

  ngOnInit(): void {
    this.toastr.success(localStorage.getItem('User')?.toString());
  }

  checkUser(){
    this.apiService.getUser(this.form.value.email).subscribe((data: User) => {
      
      try {
        if (data.email && this.form.value.contrasena == data.contrasena) {
          this.toastr.success('Sesión iniciada correctamente');
          localStorage.setItem('User', JSON.stringify(data)); // Esta línea guarda la información del login para mantener iniciada la sesión
          this.router.navigate(['/']);
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

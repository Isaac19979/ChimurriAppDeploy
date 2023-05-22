
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators  } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  miFormulario: FormGroup = this.fb.group({
    email: ['',[Validators.required, Validators.email]],
    contraseña: ['',[Validators.required, Validators.minLength(6)]],
  });


  constructor(private fb: FormBuilder,
              private router: Router,
              private authService:AuthService){ }


    login(){

      const {email, contraseña } = this.miFormulario.value

      this.authService.login( email,contraseña).
      subscribe(ok => {
        console.log(ok);
        if(ok === true){
          this.router.navigateByUrl('/empleados');
        }else{
          Swal.fire('Error',ok,'error')
        }
      });

    }



}

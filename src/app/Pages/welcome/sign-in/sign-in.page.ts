import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { User } from '@codetrix-studio/capacitor-google-auth/dist/esm';
import { AuthService } from 'src/app/Services/auth.service';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {
  public userinfo: User;
  public userdata: any;
  public form: FormGroup | any;

  constructor(private router: Router,
    private authS: AuthService) {
    this.initForm();
  }

  initForm() {
    this.form = new FormGroup({
      email: new FormControl(null, { validators: [Validators.required, Validators.email] }),
      password: new FormControl(null, { validators: [Validators.required, Validators.minLength(8)] }),
    });
  }


  ngOnInit() {
  }

  /**
   * Comprueba si el usuario esta registrado.
   * Si lo esta lo redirecciona a la pantalla principal tab1.
   */
  ionViewWillEnter() {
    if (this.authS.isLogged()) {
      this.router.navigate(['/main/tabs/tab1']);
    }
  }

  /**
   * Al Pulsar en sing Establece el usuario
   * y llama a authservice para iniciar sesion con dicho ususario.
   */
  onSubmit() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    } else {
      this.userdata = this.saveUserdata();
      this.authS.inicioSesion(this.userdata)
        .then(data => {
          if (data) {
            this.router.navigate(['/main/tabs/tab1']);
          }
        })
        .catch(error => {
          console.log(error);
        }
        );
    }
    console.log(this.form.value);
  }

  /**
    * Creacion de un usuario con datos del usuario.
    * @returns Usuario con los datos introducidos del usuario.
    */
  saveUserdata() {
    const saveUserdata = {
      email: this.form.get('email').value,
      password: this.form.get('password').value,
    };
    return saveUserdata;
  }


}

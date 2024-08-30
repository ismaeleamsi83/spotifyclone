import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@modules/auth/services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  formLogin: FormGroup = new FormGroup({});

  errorSesion: boolean = false;

  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private router: Router
  ) {
    this.formLogin = new FormGroup({
      email: new FormControl ('', [
        Validators.email, 
        Validators.required
      ]),
      password: new FormControl ('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(12)
      ])
    });
   }

  ngOnInit(): void {
  }

  onSubmit(){
    const {email, password} = this.formLogin.value;
    this.authService.sendCredencials(email, password)
    .subscribe(responseOk => {
      // this.errorSesion = false;
      const { tokenSession, data } = responseOk
      this.cookieService.set('token', responseOk.tokenSession, 4, '/');
      console.log(responseOk);
      this.router.navigateByUrl('/tracks');
    }, err =>{
      this.errorSesion = true;
      console.log(err);
    });
  }

}

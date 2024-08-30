
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly URL = environment.api;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }

  sendCredencials(email: string, password: string): Observable<any>{
    
    const body = {
      email, 
      password
    };
    return this.http.post(`${this.URL}/auth/login`, body).pipe(
      tap((response:any) => {
        const { data, tokenSession } = response;
        this.cookieService.set('token', tokenSession);
      })
    );
  }

  getCredencials(): Observable<boolean>{
    let tokenExist = false;
    if(this.cookieService.get('token')){
      tokenExist = true;
    }
    return of(tokenExist);
  }


}

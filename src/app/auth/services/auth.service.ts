import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { AuthResponce, Usuario } from '../interfaces/interfaces';
import {map, catchError} from 'rxjs/operators';
import { of, tap, Observable } from 'rxjs';
;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string= environment.baseUrl;
  private _usuario!: Usuario;

  get usuario(){
    return {...this._usuario};
  }

  constructor(private http:HttpClient) { }

  registro( nombre:string,email:string,contraseña:string){

    const url = ` ${this.baseUrl}/auth/new`
    const body ={ nombre, email, contraseña}


    return this.http.post<AuthResponce>(url, body)
    .pipe(
      tap( resp => {
        if( resp.ok ){
          localStorage.setItem('token',resp.token!);
          this._usuario ={
            nombre: resp.nombre!,
            uid: resp.uid!,
            email: resp.email!,
          }
        }
      }),
      map(resp => resp.ok),
      catchError(err => of (err.error.msg) )
    );

  }


  login( email: string, contraseña:string){

    const url = ` ${this.baseUrl}/auth/`
    const body ={ email , contraseña}


    return this.http.post<AuthResponce>(url, body)
    .pipe(
      tap( resp => {
        if( resp.ok ){
          localStorage.setItem('token',resp.token!);
          this._usuario ={
            nombre: resp.nombre!,
            uid: resp.uid!,
            email: resp.email!,
            
          }
        }
      }),
      map(resp => resp.ok),
      catchError(err => of (err.error.msg) )
    );
  }

  validarToken(): Observable<boolean>{
    const url = ` ${this.baseUrl}/auth/renew`;
    const headers = new HttpHeaders()
      .set('x-token',localStorage.getItem('token')! || '12345');

    return this.http.get<AuthResponce>(url, {headers})
      .pipe(
        map( resp => {
          localStorage.setItem('token',resp.token!);
          this._usuario ={
            nombre: resp.nombre!,
            uid: resp.uid!,
            email: resp.email!,
          }
          return resp.ok;
        }),
        catchError(err => of(false))
      );
  }

  logout(){
    localStorage.clear();
  }
  
}

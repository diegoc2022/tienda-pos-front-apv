import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { LoginData } from '../../interfaces/login/login.interface';
import Environment from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private URL?:string;
  private API?:string
  
  constructor(private http: HttpClient) {
    this.URL = Environment.endpoint;
    this.API = 'login/user/';
  }

  funcRetornaUsuario(user:any, passw:any):Observable<LoginData>{    
    return this.http.post<LoginData>(`${this.URL}/${this.API}`,{
      "user":user,
      "clave":passw
    })
  }
}

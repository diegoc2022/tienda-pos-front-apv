import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Environment from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })
export class ClasificacionService {
    private URL?:string;
    private API?:string;

    constructor(private http:HttpClient){
        this.URL = Environment.endpoint
        this.API = '/clasificacion';
    }

    funct_retorna_clasificacion(){
        return this.http.get(`${this.URL}${this.API}`);
    }
}

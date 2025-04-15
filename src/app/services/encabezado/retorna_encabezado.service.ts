import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Environment from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })
export class RetornaEncabezadoService {
    private URL?:string;
    private API?:string;
    constructor(private http:HttpClient){
        this.URL = Environment.endpoint;
        this.API = 'encabezado/';
    }

    functRetornaEncabezadoService(){
        return this.http.get(`${this.URL}/${this.API}`);
    }
}


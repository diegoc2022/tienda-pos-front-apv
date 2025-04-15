
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Environment from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })
export class RetornaComprasService {
    private URL?:string;
    private API?:string;
    constructor(private http:HttpClient){
        this.URL = Environment.endpoint
        this.API = 'venta-producto';
    }

    functRetornaComprasService(){
        return this.http.get(`${this.URL}/${this.API}`);
    }
}

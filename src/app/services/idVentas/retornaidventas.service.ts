import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Environment from 'src/environments/environment';

@Injectable()
export class RetornaIdVentasService {

    private URL?:string;
    private API?:string;
    constructor(private http:HttpClient){
        this.URL = Environment.endpoint;
        this.API = 'id-ventas/';
    }

    functRetornaIdVentasService(){
        return this.http.get(`${this.URL}/${this.API}`);
    }
    
}

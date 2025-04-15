import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Environment from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })
export class RetornaVentasService {
    private URL?:string;
    private API?:string;
   
    constructor(private http:HttpClient){
        this.URL = Environment.endpoint;
        this.API = 'ventas-temp';        
    }

    functRetornaVentasService(){
        return this.http.get(`${this.URL}/${this.API}`);
    }

    functRetornaVentasIdCaja(id:number){               
        return this.http.get(`${this.URL}/${this.API}/${id}`);
    }

    funct_retorna_ventas_facturas(id:any){
        return this.http.get(`${this.URL}/${this.API}/factura/${id}`)
    }

       
}

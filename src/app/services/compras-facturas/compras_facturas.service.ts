
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Environment from 'src/environments/environment';

@Injectable()
export class ComprasFacturasService {
    private URL?:string;
    private API?:string;
    constructor(private http:HttpClient){
        this.URL = Environment.endpoint
        this.API = 'compras-facturas';
    }

    functGetComprasFacturasService(factura:any){       
        return this.http.get(`${this.URL}/${this.API}/${factura}`);
    }

    functCreateComprasFacturas(num:any){
        return this.http.post(`${this.URL}/${this.API}`,{
            "factura":num[0].num_factura.toUpperCase()
        })
    }
}

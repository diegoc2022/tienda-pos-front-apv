import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegistraVentasInterface } from '../../interfaces/ventas/registra_ventas.interface';
import { Observable } from 'rxjs';
import Environment from 'src/environments/environment';

@Injectable()
export class RegistraVentasHistoricosService {
    private URL:string;
    private API:string;
    cantidad?:number;  
    total?:number;

    constructor(private http:HttpClient){
        this.URL = Environment.endpoint;
        this.API = 'ventas-historicos';
    }

    functRegistraVentasHistoricos(data:any[]):Observable<any[]>{             
        return this.http.post<any[]>(`${this.URL}/${this.API}`,data);        
    }
}

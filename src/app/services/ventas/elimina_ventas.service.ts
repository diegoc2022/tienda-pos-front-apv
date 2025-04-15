
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CodigoProducto } from 'src/app/interfaces/ventas/codigo_venta.interface';
import Environment from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class EliminaVentasService {
    private URL?:string;
    private API?:string;

    constructor(private http:HttpClient){
        this.URL = Environment.endpoint;
        this.API = 'ventas-temp';
    }
   
    functEliminaVentasService(data:CodigoProducto){
        return this.http.delete(`${this.URL}/${this.API}/item/${data.id}/${data.codProd}`);
    }

    funct_elimina_id_ventas(data:any):Observable<any>{               
        return this.http.delete(`${this.URL}/${this.API}/vent/`,{body:data});
    }
    
}

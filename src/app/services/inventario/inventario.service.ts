
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Environment from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class InventarioService {
    private URL?:string;
    private API?:string;

    constructor(private http:HttpClient){
        this.URL = Environment.endpoint;
        this.API = 'inventario';
    }   
   
    funct_edita_ventas_inventario(data:any[]):Observable<any[]>{                                    
        return this.http.post<any[]>(`${this.URL}/${this.API}/editaVentaInv`,data);      
    }

    funct_edita_compras_inventario(data:any[]):Observable<any>{                                                  
        return this.http.patch(`${this.URL}/${this.API}`,data);      
    }

    funct_retorna_inventario(){
        return this.http.get(`${this.URL}/${this.API}`);
    }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Environment from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })
export class UpdateVentasService {
    private URL?:string;
    private API?:string;
    cantidad?:number;  
    subtotal?:number;

    constructor(private http:HttpClient){
        this.URL = Environment.endpoint;
        this.API = 'ventas-temp';
    }

    functEditaCantidadService(data:any){         
        this.subtotal = data.cantidad * data.precio_venta;
        return this.http.patch(`${this.URL}/${this.API}/${data.id}/${data.codProd}`,{            
            "cantidad":data.cantidad,           
            "subtotal":this.subtotal
        });
    }

    functCloseVentasService(data:any){             
        return this.http.patch(`${this.URL}${this.API}${data.id}/${data.codProd}`,{            
            "activo":true           
        });
    }    
}


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RegistraVentasInterface } from '../../interfaces/ventas/registra_ventas.interface';
import { Observable } from 'rxjs';
import Environment from 'src/environments/environment';
import { format } from 'date-fns';

@Injectable({
    providedIn: 'root'
  })
export class RegistraVentaProductosService {
    private URL:string;
    private API:string;
    cantidad?:number;  
    total?:number;
    form_fecha:Date = new Date();
    
    constructor(private http:HttpClient){
        this.URL = Environment.endpoint;
        this.API = 'ventas-temp';
    }

    functRegistraVentasService(registraVentas:RegistraVentasInterface,data:any,accion:any,idCaja:any,fact:any):Observable<RegistraVentasInterface>{ 
        this.cantidad = 1; 
        const prefijo = 'C1-';
        const user = localStorage.getItem('user');      
        this.total = this.cantidad * registraVentas.precio_venta;
        const fecha_actual = format(this.form_fecha,'yyyy-MM-dd'); 
        const hora_actual =  format(this.form_fecha,'HH:mm:ss');     
        return this.http.post<RegistraVentasInterface>(`${this.URL}/${this.API}`,{           
            "id_venta":prefijo+0, 
            "id_caja":idCaja,  
            "codProd":registraVentas.codProd,    
            "descripcion":registraVentas.descripcion,               
            "cantidad":this.cantidad,
            "existencia":registraVentas.existencia, 
            "precio_compra":registraVentas.precio_compra,  
            "precio_venta":this.total,  
            "origen_venta":data,            
            "subtotal":this.total,
            "vendedor":user,
            "estado":accion,
            "factura": fact,
            "venta_por_und":registraVentas.venta_por_und,
            "fecha_registro":fecha_actual,
            "hora_registro": hora_actual      
        })
        
    }
}

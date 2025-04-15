import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Environment from 'src/environments/environment';


@Injectable()
export class EditaVentaProductoService {
    private URL?:string;
    private API?:string;
   

    constructor(private http:HttpClient){
        this.URL = Environment.endpoint;
        this.API = 'editar';
    }

    functEditaPreciosServices(codigo:any,data:any,existencia:number){ 
        const totalExistencia =existencia + parseInt(data.cantidad);             
        return this.http.patch(`${this.URL}/${this.API}/${codigo}/ventas`,{                    
            "precio_venta":data.precioVenta,
            "precio_compra":data.precioCompra,
            "iva":data.iva,
            "icui":data.icui,
            "utilidad":data.utilidad,
            "existencia":totalExistencia           
        });
    }
}

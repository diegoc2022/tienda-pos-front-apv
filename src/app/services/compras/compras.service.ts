import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Environment from 'src/environments/environment';

@Injectable()
export class ComprasService {
    private URL?:string;
    private API?:string;

    constructor(private http:HttpClient){
        this.URL = Environment.endpoint;
        this.API = 'compras';
    } 

    functCreateCompras(data:any, data2:any){      
        return this.http.post(`${this.URL}/${this.API}`,{ 
            "cod_producto":data2.codProd.toUpperCase(), 
            "descripcion":data2.descrip.toUpperCase(),     
            "num_factura":data.factura.toUpperCase(),
            "tipo_compra":data.varios,                          
            "precio_unitario":data2.precio_und, 
            "cantidad":data2.cantidad, 
            "subtotal":data2.costo_sin_iva,
            "descuento":data2.desc, 
            "total_descuento":data2.total_desc,     
            "iva":data2.iva,   
            "total_iva":data2.totaliva,  
            "icui":data2.icui,    
            "total_icui":data2.totalicui,                    
            "total_compras":data2.total_costo,
            "costo_unidad":data2.costo_und,   
            "utilidad":data2.utilidad,
            "precio_venta":data2.precioVenta               
        } )
    } 
    
    functRetornaCompras(){
        return this.http.get(`${this.URL}/${this.API}`);
    }

    functEliminaItemCompras(data:any){                        
        return this.http.delete(`${this.URL}/${this.API}/item/${data}`);
    }

    functEliminaFacturaCompras(data:any){       
        return this.http.delete(`${this.URL}/${this.API}/fact/${data[0].num_factura}`);
    }

    funct_edita_producto_compras(data:any[]):Observable<any[]>{                             
        return this.http.post<any[]>(`${this.URL}/${this.API}`,data);      
    }
    
}

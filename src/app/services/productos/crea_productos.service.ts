import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductosInterface } from '../../interfaces/productos/productos.interface';
import Environment from 'src/environments/environment';
import { AnimationKeyframesSequenceMetadata } from '@angular/animations';
import Environment2 from 'src/environments/environments2';

@Injectable({
    providedIn: 'root'
})
export class ProductosService {
    private URL?:string;
    private URL2:string;
    private API?:string;
    private API2:string;   

    constructor(private http: HttpClient) {
        this.URL = Environment.endpoint;
        this.URL2 = Environment2.endpoint;
        this.API = 'venta-producto'; 
        this.API2 = 'productos'       
    }

    funct_crea_productos(products:ProductosInterface):Observable<ProductosInterface>{                                  
        return this.http.post<ProductosInterface>(`${this.URL}/${this.API}`,{           
            "codProd":products.codProd.toUpperCase(),
            "descripcion":products.nombre.toUpperCase(),   
            "precio_compra":0,           
            "precio_venta":0,
            "existencia":0,
            "codigo_clasific":0,
            "codigo_proveed":products.codProv,    
            "iva":0,
            "icui":0,  
            "utilidad":0,
            "venta_por_und":false            
        });
    }

    funct_elimina_productos_s(data:any):Observable<any>{        
        return this.http.delete(`${this.URL}/${this.API}/${data}`)
    }

    funct_elimina_productos_masivos_s(){
        return this.http.delete(`${this.URL2}/${this.API2}`)
     }

     funct_inserta_productos_masivo_s(data:any[]){               
        return this.http.post(`${this.URL2}/${this.API2}`,data)
     }

}

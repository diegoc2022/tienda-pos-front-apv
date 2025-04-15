import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CodigoProducto } from '../../interfaces/ventas/codigo_venta.interface';
import { Observable } from 'rxjs';
import Environment from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
  })
export class RetornaProductoService {
    private URL?:string;
    private API?:string
    private API2?:string

   constructor(private http: HttpClient) { 
        this.URL = Environment.endpoint;
        this.API = 'vinculos';       
    }
   
    
    funct_retorna_vinculo_productos(codProducto:CodigoProducto):Observable<CodigoProducto>{        
        return this.http.get<CodigoProducto>(`${this.URL}/${this.API}/${codProducto}`);        
    }  

}
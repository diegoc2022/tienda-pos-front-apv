import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { format } from 'date-fns';
import { Observable } from 'rxjs';
import Environment from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VentasXCobrarService {
    private URL?:string;
    private API?:string;
    form_fecha:Date = new Date();

    constructor(private http:HttpClient){
        this.URL = Environment.endpoint;
        this.API = 'ventas-x-cobrar';
    }

    funct_registra_ventas_x_cobrar_s(data:any[], cod:any):Observable<any>{                          
      return this.http.post<any>(`${this.URL}/${this.API}/${cod.cliente}/${cod.codigo_venta}`,data);
    }

}


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Environment from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class CloseVentasService {
    private URL?:string;
    private API?:string;
    cantidad?:number;  
    subtotal?:number;

    constructor(private http:HttpClient){
        this.URL = Environment.endpoint;
        this.API = 'close-ventas';
    }    

    functCloseVentasService(data:any):Observable<any>{                                                        
        return this.http.put(`${this.URL}/${this.API}`,data);
    }
}

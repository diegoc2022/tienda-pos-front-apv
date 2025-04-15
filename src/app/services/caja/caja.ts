import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Environment from 'src/environments/environment';


@Injectable()
export class AperturaCajaService {
    private URL:string;
    private API:string;
    constructor(private http:HttpClient){
        this.URL = Environment.endpoint
        this.API = 'caja';
    }

    funct_apertura_caja(data:number){                     
        return this.http.post<number>(`${this.URL}/${this.API}`,{           
            "total_base":data,
            "estado":true           
        })        
    }

    funct_retorna_apertura_caja(){
        return this.http.get(`${this.URL}/${this.API}`);
    }

    funct_cierra_apertura_caja(id:number){      
        return this.http.patch(`${this.URL}/${this.API}/${id}`,{
            "estado":false
        })
    }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Environment from 'src/environments/environment';

@Injectable()
export class EliminaDataTemporalService {
    private URL?:string;
    private API?:string;

    constructor(private http:HttpClient){
        this.URL = Environment.endpoint;
        this.API = 'ventas-temp';
    }

    funct_elimina_ventas_temporal(){        
        return this.http.delete(`${this.URL}/${this.API}/ventas-temp/eliminar-todo`);
    }
}

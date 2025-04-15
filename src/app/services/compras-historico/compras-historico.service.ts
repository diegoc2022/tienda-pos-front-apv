import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Environment from 'src/environments/environment';

@Injectable()
export class ComprasHistoricoService {
    private URL?:string;
    private API?:string;

    constructor(private http:HttpClient){
        this.URL = Environment.endpoint;
        this.API = 'compras-historico';
    } 

    funct_guarda_compras_historico(data:any[]):Observable<any>{
        return this.http.post<any[]>(`${this.URL}/${this.API}`,data)
    }
}

/*
https://docs.nestjs.com/providers#services
*/

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VinculosInterface } from 'src/app/interfaces/vinculos/vinculos.interface';
import Environment from 'src/environments/environment';
import Environment2 from 'src/environments/environments2';

@Injectable()
export class VinculosService {
    private URL:string;
    private API:string;
    private URL2:string;

    constructor(private http:HttpClient){
        this.URL = Environment.endpoint;
        this.URL2 = Environment2.endpoint;
        this.API = 'vinculos';
    }

    functRegistraVinculosService(data:VinculosInterface):Observable<VinculosInterface>{                 
        return this.http.post<VinculosInterface>(`${this.URL}/${this.API}`,{                  
            "codigoInicial":data.codigoInic.toUpperCase(),   
            "codigoVinculo":data.codigoVinc.toUpperCase()            
        })        
    }

    funct_retorna_vinculos(id:any){       
        return this.http.get(`${this.URL}/${this.API}/${id}`)
    }

    functEliminaVinculosService(data:any):Observable<any>{                                     
        return this.http.delete(`${this.URL}/${this.API}/${data[0].codigoInicial}/${data[0].codigoVinculo}`);
    }

    funct_elimina_vinculos_masivos_s(){
        return  this.http.delete(`${this.URL2}/${this.API}`)
    }

    funct_inserta_vinculos_masivos_s(data:any[]):Observable<any[]>{
        return this.http.post<any[]>(`${this.URL2}/${this.API}`,data);
    }
}

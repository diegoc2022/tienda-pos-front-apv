
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Environment from 'src/environments/environment';

@Injectable()
export class IdSecuenciaService {
    private URL?:string;
    private API?:string;

    constructor(private http: HttpClient){
        this.URL = Environment.endpoint;
        this.API = 'secuencia';
    }

    funct_retorna_id_secuencia(){              
       return this.http.get(`${this.URL}/${this.API}`);
    }

    funct_edita_id_secuencia(sec:any[]):Observable<any>{                      
        return this.http.patch<any>(`${this.URL}/${this.API}`,sec);      
    }
}

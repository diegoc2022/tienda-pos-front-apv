import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Environment from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable()
export class EditaCodigoService {
    private URL?:string;
    private API?:string;

    constructor(private http:HttpClient){
        this.URL = Environment.endpoint;
        this.API = 'editar';
    }

    functEditaCodigoService(data:any){                                                    
        return this.http.patch(`${this.URL}/${this.API}/codigo/${data.codInicial}`,{
            "codProd":data.codNuevo.toUpperCase()            
        });
    }

    functEditaPrecios(cod:any,data:any){       
        return this.http.patch(`${this.URL}/${this.API}/ventas/${cod}`,{            
            "precio_venta":data
        });
    }

    functEditaCantidad(cod:any,data:any){ 
        let cant = parseInt(data);    
        return this.http.patch(`${this.URL}/${this.API}/cantidad/${cod}`,{            
            "existencia":cant
        });
    }

    func_activa_asociacion_unidad(cod:any,estado:boolean):Observable<any>{       
        return this.http.patch(`${this.URL}/${this.API}/activar/${cod}`,{            
            "venta_por_und":estado
        });
    }

    funct_edita_nombre_producto(data:any){
        return this.http.patch(`${this.URL}/${this.API}/producto/${data.codInicial}`,{            
            "descripcion":data.codNuevo.toUpperCase()
        });
    }
    
}

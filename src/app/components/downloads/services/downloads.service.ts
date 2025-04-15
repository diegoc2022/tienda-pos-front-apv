import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Environment from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DownloadsService {

  private URL?:string;
  private API?:string
  private API2?:string
  
  constructor(private http: HttpClient) { 
      this.URL = Environment.endpoint;
      this.API = 'venta-producto';
      this.API2 = 'vinculos';
  }

  funct_retona_productos_prod_s(){
      return this.http.get(`${this.URL}/${this.API}`);
  }

  funct_retorna_vinculos_prod_s(){               
      return this.http.get(`${this.URL}/${this.API2}`);        
  }
  
}

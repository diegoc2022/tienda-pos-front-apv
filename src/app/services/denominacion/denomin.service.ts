
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Environment from 'src/environments/environment';

@Injectable()
export class DenominacionService {
    private URL?:string;
    private API?:string;
    constructor(private http:HttpClient){
        this.URL = Environment.endpoint
        this.API = 'denomin';
    }

    functRetornaDenominacionService(){
        return this.http.get(`${this.URL}/${this.API}`);
    }
}

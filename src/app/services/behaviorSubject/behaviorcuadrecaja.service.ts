/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class VehaviorCuadreCajaService {
    display?:any[]=[];   
    behaviorSubject = new BehaviorSubject<any>(this.display);

    setData(data:any){ 
        this.display = data;        
        this.behaviorSubject.next(this.display);            
    }    

    getData(){
        return this.behaviorSubject.asObservable();
    }  
}

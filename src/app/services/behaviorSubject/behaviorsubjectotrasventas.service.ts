
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class BehaviorSubjectotrasVentasService {
    display?:any;   
    behaviorSubject = new BehaviorSubject<any>(this.display);

    setData(data:any){    
        this.display=data;
        this.behaviorSubject.next(data);                  
    }    

    getData(){
        return this.behaviorSubject.asObservable();
    }  

      
}

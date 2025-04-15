import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { AperturaCajaService } from 'src/app/services/caja/caja';

@Component({
  selector: 'app-caja',
  templateUrl: './caja.component.html',
  styleUrls: ['./caja.component.scss']
})
export class CajaComponent implements OnInit{
  formId: FormGroup = new FormGroup({});
  date: Date = new Date();
  fecha_actual:any='';
  id_apertura:number=0;


    constructor(  
      private messageService:MessageService, 
      private apertura:AperturaCajaService, 
      private fb: FormBuilder      
    ){ }

    ngOnInit() {
      this.formId = this.fb.group({
        base:[null , Validators.required]
      }); 
      this.fecha_actual = localStorage.getItem('fecha_apertura');  
    }

   funcAperturaCaja(){  
      this.apertura.funct_apertura_caja(this.formId.value.base).subscribe({
        next:obj=>{
          const objData = JSON.stringify(obj);
          const data = JSON.parse(objData);
          this.fecha_actual='';        
          this.fecha_actual = data.fecha_registro.substring(0, 10)                         
          localStorage.setItem('base_caja',this.formId.value.base);         
          localStorage.setItem('id_caja',data.id) ; 
          localStorage.setItem('estado_apertura',data.estado);
          localStorage.setItem('fecha_apertura',data.fecha_registro.substring(0, 10));          
          this.formId.setValue({base:0}); 
          this.messageService.add({ severity: 'success', summary: 'Informativo:', detail: 'Se ha creado nueva caja con id: '+ data.id});           
        }
      })      
   }
      
}

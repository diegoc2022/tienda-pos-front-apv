import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { format } from 'date-fns';
import { MessageService } from 'primeng/api';
import { EditaCodigoService } from 'src/app/services/ventas/edita-codigo.service';
import { VinculosService } from 'src/app/services/vinculos/vinculos.service';


@Component({
  selector: 'app-edita-cantidad', 
  templateUrl: './edita-cantidad.component.html',
  styleUrl: './edita-cantidad.component.scss'
})
export class EditaCantidadComponent implements OnInit{

  data: FormGroup = new FormGroup({}); 
  codigo_prod?:string;
  fecha_actual?:string;
  date: Date = new Date();
  habilitado:boolean = false;
  
  constructor(
    private fb: FormBuilder,   
    private retornaVinculos:VinculosService,
    private editar: EditaCodigoService,
    private messageService: MessageService
  ){}
  
  ngOnInit(): void {
    this.data = this.fb.group({
      codigo:[null , Validators.required],
      cantidad:[null , Validators.required]
    });
    this.habilitado = false;
    this.fecha_actual = format(this.date, 'yyyy-MM-dd HH:mm');     
  }

 
functEditaCantidad(){ 
    this.habilitado = true;    
    this.editar.functEditaCantidad(this.data.value.codigo,this.data.value.cantidad).subscribe({
      next:data=>{                
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Cantidad editada correctamente'}); 
        this.data.get('codigo')?.setValue('');
        this.data.get('cantidad')?.setValue('');
        setTimeout(()=>{
          this.habilitado = false;
          const nextElement = (document.querySelector(`[formControlName="codigo"]`) as HTMLElement);
          nextElement.focus();                
        },2000)
              
      }
    });
     
  }

  onEnterPressed(event: KeyboardEvent) {
    this.codigo_prod='';
    if (event.key === 'Enter') { 
      this.retornaVinculos.funct_retorna_vinculos(this.data.value.codigo).subscribe({
        next:data=>{          
          const nextElement = (document.querySelector(`[formControlName="cantidad"]`) as HTMLElement);
          nextElement.focus();         
        }
      })      
    }
  }

}

import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { format } from 'date-fns';
import { MessageService } from 'primeng/api';
import { EditaCodigoService } from 'src/app/services/ventas/edita-codigo.service';
import { VinculosService } from 'src/app/services/vinculos/vinculos.service';

@Component({
  selector: 'app-vinculos',
  templateUrl: './vinculos.component.html',
  styleUrls: ['./vinculos.component.scss']
})
export class VinculosComponent {  
  @ViewChild('siguienteInput') siguienteInput?: ElementRef;
  @ViewChild('siguienteInput2') siguienteInput2?: ElementRef;
  fecha_actual?:string;
  date: Date = new Date();
  data: FormGroup = new FormGroup({});
  onChecked?:boolean;
  placeholder:string='Lea código nuevo';
  placeholder2:string='Lea código existente';
  codigosVinculos:any[]=[];

  constructor(
    private vinculosservice: VinculosService,
    private ventas:EditaCodigoService,
    private messageService:MessageService,
    private fb: FormBuilder    
  ){}

  ngOnInit() {
    this.data = this.fb.group({
      codigoInic: [null , Validators.required],
      codigoVinc: [null , Validators.required],
      activaAsoc: [null , Validators.required]
    });
    this.fecha_actual = format(this.date, 'yyyy-MM-dd HH:mm');            
  }

  funcRegistraVinculos(){
    if (this.onChecked == true) {
      this.ventas.func_activa_asociacion_unidad(this.data.value.codigoInic,this.onChecked).subscribe({
        next:data=>{         
          this.vinculosservice.functRegistraVinculosService(this.data.value).subscribe({
            next:data=>{
              const obj = JSON.stringify(data);
              const obj2 = JSON.parse(obj);
              if(obj2.code != 409) {               
                this.data.get('codigoVinc')?.setValue('');
                const nextElement = (document.querySelector(`[formControlName="codigoVinc"]`) as HTMLElement);
                nextElement.focus(); 
                this.messageService.add({ severity: 'success', summary: 'Advertencia:', detail: 'Vinculo creado exitosamente',life:3000}); 
              }else{        
                this.messageService.add({ severity: 'error', summary: 'Advertencia:', detail: obj2.msg,life:3000});                   
              }      
            },error: error=>{
              this.messageService.add({ severity: 'error', summary: 'Advertencia:', detail:error,life:3000});                              
            }
          })                     
        },error: error=>{
          this.messageService.add({ severity: 'error', summary: 'Advertencia:', detail:error,life:3000});                              
        }
      })
    }else{
      this.vinculosservice.functRegistraVinculosService(this.data.value).subscribe({
        next:data=>{
          const obj = JSON.stringify(data);
          const obj2 = JSON.parse(obj);
          if(obj2.code != 409) {               
            this.data.get('codigoVinc')?.setValue('');
            const nextElement = (document.querySelector(`[formControlName="codigoVinc"]`) as HTMLElement);
            nextElement.focus(); 
            this.messageService.add({ severity: 'success', summary: 'Advertencia:', detail: 'Vinculo creado exitosamente',life:3000}); 
          }else{        
            this.messageService.add({ severity: 'error', summary: 'Advertencia:', detail: obj2.msg,life:3000});                   
          }      
        },error: error=>{
          this.messageService.add({ severity: 'error', summary: 'Advertencia:', detail:error,life:3000});                              
        }
      })     
    }   
  }

  onEnterPressed(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      const nextElement = (document.querySelector(`[formControlName="codigoVinc"]`) as HTMLElement);
      nextElement.focus();       
      //this.siguienteInput?.nativeElement.focus();
    }
  }

  onCheckboxChange(event: any) { 
    if (event.checked == true) {
      this.onChecked = event.checked;
      this.placeholder = 'Lea código paquete';
      this.placeholder2 = 'Lea código unidad';
    } else {
      this.onChecked = false;
      this.placeholder = 'Lea código nuevo';
      this.placeholder2 = 'Lea código existente';
    } 
  }

  funct_elimina_vinculos(){
    this.codigosVinculos.push({
      codigoInicial:this.data.value.codigoInic,
      codigoVinculo:this.data.value.codigoVinc
    }) 
    this.vinculosservice.functEliminaVinculosService(this.codigosVinculos).subscribe({
      next:data=>{
        const obj = JSON.stringify(data);
        const obj2 = JSON.parse(obj);       
        if(obj2.affected > 0) {               
          this.data.get('codigoInic')?.setValue('');
          this.data.get('codigoVinc')?.setValue('');
          const nextElement = (document.querySelector(`[formControlName="codigoVinc"]`) as HTMLElement);
          nextElement.focus(); 
          this.messageService.add({ severity: 'warn', summary: 'Advertencia:', detail: 'Vínculo eliminado exitosamente',life:3000}); 
        }else{        
          this.messageService.add({ severity: 'error', summary: 'Advertencia:', detail: obj2.msg,life:3000});                   
        }      
      }
    })
  }

}

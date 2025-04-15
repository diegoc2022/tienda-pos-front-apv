import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { format } from 'date-fns';
import { MessageService } from 'primeng/api';
import { EditaCodigoService } from 'src/app/services/ventas/edita-codigo.service';
import { VinculosService } from 'src/app/services/vinculos/vinculos.service';

@Component({
  selector: 'app-edita-precios',  
  templateUrl: './edita-precios.component.html',
  styleUrl: './edita-precios.component.scss'
})
export class EditaPreciosComponent {

  data: FormGroup = new FormGroup({});
  @ViewChild('codigo') codigo?: ElementRef;
  @ViewChild('precio') precio?: ElementRef;
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
      precio:[null , Validators.required]
    });
    this.habilitado = false;
    this.fecha_actual = format(this.date, 'yyyy-MM-dd HH:mm'); 
  }

  onEnterPressed(event: KeyboardEvent) {
    this.codigo_prod='';
    if (event.key === 'Enter') { 
      this.retornaVinculos.funct_retorna_vinculos(this.data.value.codigo).subscribe({
        next:data=>{ 
          const objData = JSON.stringify(data);
          const obj = JSON.parse(objData);                                              
          this.codigo_prod=obj[0].producto.codProd;
          this.precio?.nativeElement.focus();
        }
      })      
    }
  }

  functEditaPrecios(){
    this.habilitado = true;     
    this.editar.functEditaPrecios(this.codigo_prod,this.data.value.precio).subscribe({
      next:data=>{        
        this.messageService.add({severity:'success', summary: 'Successful', detail: 'Precio editado correctamente'});
        this.data.get('codigo')?.setValue('');
        this.data.get('precio')?.setValue('');
        setTimeout(()=>{
          this.habilitado = false;
          const nextElement = (document.querySelector(`[formControlName="codigo"]`) as HTMLElement);
          nextElement.focus();                
        },2000)            
      }
    });
     
  }
}



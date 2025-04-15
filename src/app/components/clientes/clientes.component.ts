import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { format } from 'date-fns';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { ClientesService } from 'src/app/services/clientes/clientes.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-clientes',  
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.scss',
  standalone:true,
  imports: [ReactiveFormsModule,ToastModule,ButtonModule],
})
export class ClientesComponent implements OnInit{

  data!: FormGroup;
  data_proveedor:any[]=[];
  fecha_actual?:string;
  date: Date = new Date();
  
  constructor(
    private fb: FormBuilder,     
    private message: MessageService, 
    private cliente:ClientesService  
  ){}

  ngOnInit(): void {
    this.data = this.fb.group({
      cedula: ['', Validators.required],   
      nombre_cliente: ['', Validators.required],
      telefono: ['', Validators.required],           
    });    
    this.fecha_actual = format(this.date, 'yyyy-MM-dd HH:mm:ss');         
  }

  on_enter_cedula_cliente(event:any){
    if (event.code =="Enter") {             
        const nextElement = (document.querySelector(`[formControlName="nombre_cliente"]`) as HTMLElement);
        nextElement.focus();    
    }             
  }

  on_enter_nombre_cliente(event:any){
    if (event.code =="Enter") {             
        const nextElement = (document.querySelector(`[formControlName="telefono"]`) as HTMLElement);
        nextElement.focus();    
    }             
  }
  
  funct_registra_clientes_c(){     
      this.cliente.funct_registra_clientes_s(this.data.value).subscribe({
        next:data=>{
          const obj = JSON.stringify(data);
          const obj2 = JSON.parse(obj);         
          if (obj2.status != 409) {
            this.data.get('cedula')?.setValue('');
            this.data.get('nombre_cliente')?.setValue('');
            this.data.get('telefono')?.setValue('');
            this.message.add({severity:'info', summary: 'Informativo:', detail: 'Cliente registrado exitosamente',life:3000});
            const nextElement = (document.querySelector(`[formControlName="cedula"]`) as HTMLElement);
            nextElement.focus(); 
          } else {
            this.message.add({severity:'error', summary: 'Error:', detail:obj2.msg,life:3000});
          }        
        }
      })  
    }
}

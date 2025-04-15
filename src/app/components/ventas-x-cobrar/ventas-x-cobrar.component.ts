import { Component,CUSTOM_ELEMENTS_SCHEMA, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { FormsModule } from '@angular/forms';
import { ClientesService } from 'src/app/services/clientes/clientes.service';
import { AutoCompleteCompleteEvent } from 'primeng/autocomplete';
import { DropdownModule } from 'primeng/dropdown';


@Component({
  selector: 'app-ventas-x-cobrar', 
  templateUrl: './ventas-x-cobrar.component.html',
  styleUrl: './ventas-x-cobrar.component.scss',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ToastModule,ButtonModule,    
    FormsModule,
     DropdownModule,     
  ],  
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class VentasXCobrarComponent implements OnInit{  
  data:FormGroup = new FormGroup({});
  clientes:any[] = [];
  date: Date | undefined;
  constructor(
     private fb: FormBuilder,
      private r_cliente:ClientesService,
  ){}

  

  ngOnInit() {
    this.data = this.fb.group({
      cliente: ['0'],
    });
    
    this.funct_retorna_clientes_c();
  }

  funct_retorna_clientes_c(){
    this.r_cliente.funct_retorna_clientes_s().subscribe({
      next:data=>{
        const objData = JSON.stringify(data);
        const obj = JSON.parse(objData);
        this.clientes =[]; 
        for (let index = 0; index < obj.length; index++) {
          this.clientes.push(obj[index]);          
        }
      }
    })
  }

      
}

import { Component } from '@angular/core';
import { RetornaInventarioService } from 'src/app/services/impresion/retorna-inventario.service';
import { InventarioService } from 'src/app/services/inventario/inventario.service';


@Component({
  selector: 'app-inventario',  
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.scss'
})
export class InventarioComponent {
  data:any[]=[];
  constructor(
    private retornaSevices:RetornaInventarioService,
    private inventarioSevices:InventarioService
  ){}

  funct_cargar_inventario(){
    this.inventarioSevices.funct_retorna_inventario().subscribe({next:data=>{
      const obj = JSON.stringify(data);
      const obj2 = JSON.parse(obj);
      for (let index = 0; index < obj2.length; index++) {
          //this.data.push(obj2[index]);            
      }        
    }})    
  }
  
  funct_imprime_inventario(){
    //this.retornaSevices.funct_imprime_inventario(this.data);
  }
    
}

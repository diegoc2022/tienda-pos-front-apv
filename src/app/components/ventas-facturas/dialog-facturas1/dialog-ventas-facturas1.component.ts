import { Component, ViewEncapsulation } from '@angular/core';
import { BehaviorSubjectService } from 'src/app/services/behaviorSubject/behaviorsubject.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { RetornaVentasService } from 'src/app/services/ventas/retorna_ventas.service';
import { MessageService } from 'primeng/api';
import { ImprimeFacturasService } from 'src/app/services/impresion/imprime-facturas.service';
import { CloseVentasService } from 'src/app/services/ventas/close-ventas.service';
import { FormVentas1Component } from '../../ventas/FormVentas1/formventas1.component';
import { IdSecuenciaService } from '../../../services/secuencia/id_secuencia.service';
import { InventarioService } from 'src/app/services/inventario/inventario.service';

@Component({
  selector: 'app-dialog-ventas-facturas1',
  templateUrl: './dialog-ventas-facturas1.component.html',
  styleUrls: ['./dialog-ventas-facturas1.component.scss']  
})
export class DialogVentasFacturas1Component {
  visibleDialog:boolean=false; 
  ventasProductos: any[]=[];  
  venta_total:number = 0;
  total_efectivo:number =0;
  total_cambio:number =0;  
  dataService$?: Subscription;  
  form:FormGroup = new FormGroup({}); 
  dataObj?:any;
  idSecuencia:any[]=[];


  constructor(
    private behaviorSubject : BehaviorSubjectService,   
    private retornaVentas:RetornaVentasService,
    private imprimeFacturaServices:ImprimeFacturasService,
    private closeVentas:CloseVentasService, 
    private messageService: MessageService, 
    private formVenta: FormVentas1Component, 
    private secuencia:IdSecuenciaService,
    private inventario:InventarioService,
    private fb: FormBuilder, 
  ){
    this.dataService$= this.behaviorSubject.getData().subscribe({
      next:data=>{      
         if (data.origen == 'ventas') {
          this.visibleDialog = data.visible; 
          this.total_cambio=0; 
          this.functRetornaVentas();              
         }             
        
      },error: error=>{
        console.log("ErrorBehavior: ",error);            
      }
    });
  }

ngOnInit() {
    this.form = this.fb.group({
      total_oper:[null , Validators.nullValidator],
      efectivo:[null , Validators.nullValidator],
      cambio:[null , Validators.nullValidator]
    }); 
    this.functRetornaVentas();
    this.functRetornaSecuencia(); 
    this.formVenta.functRetornaSecuencia(); 
    this.visibleDialog = false;    
  }   

  functRetornaVentas(){   
    this.retornaVentas.functRetornaVentasService().subscribe(resp =>{
      const objData = JSON.stringify(resp);
      const data = JSON.parse(objData);     
      this.venta_total =0;     
      this.ventasProductos.length=0;          
      for (let index = 0; index < data.length; index++) {
        if (data[index].origen_venta == 'Ventas-1' && data[index].estado =='abierto1') { 
            this.ventasProductos.push(data[index]);                      
            this.venta_total = this.venta_total + data[index].subtotal;                   
          }          
      }  
             
    }) 
     
  } 

  functCalculaEfectivo(){
    if (this.form.value.efectivo >= this.venta_total ) {
      this.total_cambio =parseInt(this.form.value.efectivo) - this.venta_total;
      return;
    }
    this.total_cambio =0;
    this.messageService.add({severity:'info', summary:'Product Selected', detail:'Debe ingresar un valor mayor o igual a total a pagar'});
  }

  functImprimeFacturas(){
    this.imprimeFacturaServices.funct_imprime_facturas(this.idSecuencia);     
  }

  functRetornaSecuencia(){
    this.secuencia.funct_retorna_id_secuencia().subscribe({
      next:id=>{
        const objData = JSON.stringify(id);
        const obj = JSON.parse(objData);     
        this.idSecuencia.length =0;
        this.idSecuencia.push({
          nombre:obj[0].nombre,
          id_secuencia:obj[0].id_secuencia + 1
        })                                
      }
    })
  } 

  functCloseVentas() {   
    this.closeVentas.functCloseVentasService(this.ventasProductos).subscribe({
      next:data=>{               
        this.inventario.funct_edita_ventas_inventario(this.ventasProductos).subscribe({
          next:data=>{              
            this.secuencia.funct_edita_id_secuencia(this.idSecuencia).subscribe({
            next:data=>{
              this.formVenta.functRetornaSecuencia();
              this.functRetornaSecuencia(); 
              this.formVenta.functRetornaVentas();
              this.formVenta.functInpuFocus();                  
              this.total_efectivo=0;             
              this.visibleDialog=false;                                     
              }
            })   
          }
        })         
                   
    },error: error=>{
      console.log("Error: ",error);            
    }         
    });   
  }
  
  ngOnDestroy(): void {
    this.dataService$?.unsubscribe();
  } 

}

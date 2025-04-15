import { Component, OnDestroy, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { BehaviorSubjectService } from 'src/app/services/behaviorSubject/behaviorsubject.service';
import { RetornaComprasService } from 'src/app/services/compras/retorna-compras.service';
import { RetornaProductoService } from 'src/app/services/productos/retorna_productos.service';
import { RegistraVentaProductosService } from 'src/app/services/ventas/registra_ventas.service';
import { FormVentas1Component } from '../../ventas/FormVentas1/formventas1.component';
import { Table } from 'primeng/table';
import Swal, {SweetAlertOptions} from 'sweetalert2';
import { VinculosService } from 'src/app/services/vinculos/vinculos.service';
import { ProductosService } from 'src/app/services/productos/crea_productos.service';

@Component({
  selector: 'app-busca-productos',
  templateUrl: './busca-productos.component.html',
  styleUrls: ['./busca-productos.component.scss']
})
export class BuscaProductosComponent implements OnDestroy{
  @ViewChild('dt2') dt2?: Table;
  visible:boolean=false;
  dataBuscaProductos:any[]=[];
  selectedProduct1?:any[];
  dataService$?: Subscription;
  loading: boolean =false;
  origen_ventas:string = 'Ventas-1';
  openventas:string='abierto1';
  closeventas:string='cerrado1';
  idApertCaja?:number;
  idVentas:number=0; 
  prefijo_rem:string='';
  codigo:string = '';


  constructor(
    private behaviorSubject : BehaviorSubjectService, 
    private retornaCompras:RetornaComprasService,
    private messageService: MessageService,
    private retornaProductos: RetornaProductoService,
    private registraVentas:RegistraVentaProductosService,   
    private formVenta: FormVentas1Component,
    private vinculosservice: VinculosService,
    private productos:ProductosService    
  ){
    this.dataService$=this.behaviorSubject.getData().subscribe({
      next:data=>{       
        if (data.origen == 'buscap') {
          this.visible = data.visible;        
         }       
      },error: error=>{
        console.log("ErrorBehavior: ",error);            
      }
    });     
  }

  ngOnInit() {     
    this.visible = false;
    this.functRetornaProductos();       
  } 
  
  functRetornaProductos(){
    this.dataBuscaProductos.length = 0;
    this.retornaCompras.functRetornaComprasService().subscribe({
      next:data =>{   
        const objData = JSON.stringify(data);
        const obj = JSON.parse(objData);
        for (let index = 0; index < obj.length; index++) {
          this.dataBuscaProductos.push(obj[index]);   
        }             
      }
    })
  }

  onRowSelect(event:any) {    
    this.retornaProductos.funct_retorna_vinculo_productos(event.data.codProd).subscribe({next:(data:any)=>{
        const objData = JSON.stringify(data);
        const data2 = JSON.parse(objData); 
        const estado_apertura=localStorage.getItem('estado_apertura');
        if (estado_apertura == 'true') {
          if (data2[0].producto != null) {          
            let get_id_caja = localStorage.getItem('id_caja'); 
            let factura = localStorage.getItem('factura')         
            this.registraVentas.functRegistraVentasService(data2[0].producto,this.origen_ventas,this.openventas,get_id_caja,factura).subscribe({
              next:resp =>{
              this.formVenta.functRetornaVentas(); 
              this.formVenta.functInpuFocus();              
              this.visible = false; 
              this.messageService.add({severity:'info', summary:'Product Selected', detail: 'Acaba de agregar un producto mas en la lista de compras',life:3000});                              
            },error:any=>{
              console.log("Error: error");            
            }
            });

          } else{
            this.messageService.add({severity:'error', summary:'Product Selected', detail:'El producto que intenta vender no existe en base de datos',life:3000});
          }   
        } else {
          this.messageService.add({severity:'warn', summary:'Adventencia:', detail:'Antes de iniciar operación, debe generar apertura de caja',life: 3000});
        }         

      }         
      
  }); 
  }

  funct_elimina_productos(data:any){
    this.codigo ='';   
    this.codigo = data.codProd;
    this.vinculosservice.funct_retorna_vinculos(data.codProd).subscribe({
      next:data=>{ 
        const objData = JSON.stringify(data);
        const obj = JSON.parse(objData); 
        console.log("Data2: ",obj); 
        if (obj.length > 0) {
          this.vinculosservice.functEliminaVinculosService(obj).subscribe({
            next:data=>{
              this.productos.funct_elimina_productos_s(this.codigo).subscribe({
                next:data=>{
                  this.functRetornaProductos();
                  this.visible = false;
                  this.messageService.add({severity:'warn', summary:'Adventencia:', detail:'Producto eliminado de la base de datos',life: 3000});
                }
              })                     
            }
          })     
        } else {
          this.productos.funct_elimina_productos_s(this.codigo).subscribe({
            next:data=>{
              this.functRetornaProductos();
              this.visible = false;
              this.messageService.add({severity:'warn', summary:'Adventencia:', detail:'Producto eliminado de la base de datos',life: 3000});
            }
          })    
        }   
                   
      }
    })
  }

  clear(table: Table) {
    table.clear();
  }

  ngOnDestroy(): void {
    this.dataService$?.unsubscribe();
  }

}

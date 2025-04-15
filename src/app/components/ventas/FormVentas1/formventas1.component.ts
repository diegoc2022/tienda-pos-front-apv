import { Component, OnDestroy, OnInit } from '@angular/core';
import { MessageService} from 'primeng/api';
import { CodigoProducto } from '../../../interfaces/ventas/codigo_venta.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegistraVentaProductosService } from 'src/app/services/ventas/registra_ventas.service';
import { RetornaVentasService } from 'src/app/services/ventas/retorna_ventas.service';
import { UpdateVentasService } from 'src/app/services/ventas/edita_ventas.service';
import { RegistraVentasInterface } from 'src/app/interfaces/ventas/registra_ventas.interface';
import { EliminaVentasService } from 'src/app/services/ventas/elimina_ventas.service';
import { BehaviorSubjectService } from 'src/app/services/behaviorSubject/behaviorsubject.service';
import { Subscription } from 'rxjs';
import { IdSecuenciaService } from '../../../services/secuencia/id_secuencia.service';
import Swal, {SweetAlertOptions} from 'sweetalert2';
import { VinculosService } from 'src/app/services/vinculos/vinculos.service';
import { ImprimeFacturasService } from 'src/app/services/impresion/imprime-facturas.service';
import { ClientesService } from 'src/app/services/clientes/clientes.service';
import { VentasXCobrarService } from 'src/app/services/ventas-x-cobrar/ventas-x-cobrar.service';



@Component({
  selector: 'app-formventas1',
  templateUrl: './formventas1.component.html',
  styleUrls: ['./formventas1.component.scss'],
  providers: [MessageService]  
})
export class FormVentas1Component implements OnInit, OnDestroy{

    products: any[]=[];
    fecha_apertura:any ='';
    selectedProduct1?: CodigoProducto;
    selectedProduct2?:any[];
    data:FormGroup = new FormGroup({});
    data2:FormGroup = new FormGroup({}); 
    data3:FormGroup = new FormGroup({});
    formFactura:FormGroup = new FormGroup({});
    total_venta:number=0;    
    total_articulos:number =1;
    origen_venta:string='Ventas-1';
    dataService$?: Subscription; 
    openventas:string='abierto1';
    idApertCaja:any =0;
    factura:string='';  
    habilitado:boolean = false; 
    visible:boolean = false; 
    visible2:boolean = false; 
    visible3:boolean = false;     
    producto_unidad:any[]=[]; 
    elimina_paquete_producto:any[]=[];
    idSecuencia:any[]=[];
    clientes:any[] = [];
    isChecked: boolean = false;
    codigo_venta:number =0;

 

    constructor(      
        private registraVentas:RegistraVentaProductosService, 
        private retornaVentas:RetornaVentasService, 
        private editaVentas:UpdateVentasService, 
        private eliminaVentas:EliminaVentasService, 
        private messageService: MessageService,        
        private behaviorSubject:BehaviorSubjectService,
        private retornaVinculos: VinculosService,  
        private secuencia:IdSecuenciaService, 
        private reimprime:ImprimeFacturasService,          
        private fb: FormBuilder,
        private r_cliente:ClientesService,
        private ventas_xc:VentasXCobrarService
      ){ 
               
    } 
      
    ngOnInit() {
        this.data = this.fb.group({
          codProducto: ['0']          
        }); 
        
        this.data2 = this.fb.group({
          cantidad:[null , Validators.required]
        });

        this.data3 = this.fb.group({
          cliente:[null , Validators.required],
          codigo_venta:[null , Validators.required]
        });

        this.formFactura = this.fb.group({
          factura:[null , Validators.required]
        });

        this.functRetornaVentas();   
        this.functRetornaSecuencia(); 
        this.funct_retorna_clientes_c();       
        this.functInpuFocus();                   
        this.habilitado = false;
        this.visible2 = false;
        this.visible3 = false;       
        this.fecha_apertura= localStorage.getItem('fecha_apertura');             
}


functRetornaVentas(){ 
  this.retornaVentas.functRetornaVentasService().subscribe({
    next:resp=>{
      const objData = JSON.stringify(resp);
      const data = JSON.parse(objData);        
      this.total_articulos = 0;       
      this.total_venta=0;
      this.data.reset();
      this.products = [];
      for (let index = 0; index < data.length; index++) {
        if (data[index].estado == 'abierto1') {                 
              this.total_articulos++;        
              this.products.push(data[index]);
              this.products.reverse();                                
              this.total_venta = this.total_venta + data[index].subtotal;                         

              if (data[index].existencia < 1) {
                this.habilitado =true;
              } 
              
              if (data[index].precio_compra > data[index].precio_venta) {
                this.habilitado =true;
              } 
          } 
        } 
                
      }               
    })      
  } 

      
 funct_retorna_productos(){
  const estado_apertura = localStorage.getItem('estado_apertura');  
  if(estado_apertura == 'true'){ 
    this.retornaVinculos.funct_retorna_vinculos(this.data.value.codProducto).subscribe({
      next:data=>{         
        const objData = JSON.stringify(data);
        const obj = JSON.parse(objData);                  
        this.producto_unidad = [];                                                                                       
          if (obj.code != 200) {
            this.idApertCaja= localStorage.getItem('id_caja');               
            this.registraVentas.functRegistraVentasService(obj[0].producto,this.origen_venta,this.openventas,this.idApertCaja,this.factura).subscribe({
              next:data=>{
                this.functRetornaVentas(); 
                this.functRetornaSecuencia();              
                this.data.setValue({codProducto:''}); 
                this.functInpuFocus();                              
              }
              });               
            } else{
              this.messageService.add({severity:'error', summary:'Error:', detail:obj.msg,life: 3000});             
            }                     
        }
      })          
    }else{
      this.messageService.add({severity:'warn', summary:'Adventencia:', detail:'Antes de iniciar operación, debe generar apertura de caja',life: 3000});
  } 
   
}

functRetornaSecuencia(){
    this.secuencia.funct_retorna_id_secuencia().subscribe({
      next:id=>{
        const objData = JSON.stringify(id);
        const obj = JSON.parse(objData);        
        this.factura ='';
        this.factura += obj[0].id_secuencia + 1;
        localStorage.setItem('factura',this.factura);            
      }      
    })
    if (this.total_articulos == 0) {
      this.habilitado =false;
    }  
  }

  functEditaVentas(product:RegistraVentasInterface) {
      this.editaVentas.functEditaCantidadService(product).subscribe({
        next:data=>{
          this.functRetornaVentas();
          this.functInpuFocus();
        }
    })
  }

  functEliminaItemVentas(product:RegistraVentasInterface){  
    this.eliminaVentas.functEliminaVentasService(product).subscribe({
      next:data=>{
      this.functRetornaVentas();
      this.messageService.clear();
      this.functInpuFocus();
      this.producto_unidad =[];
      this.habilitado = false;
      this.messageService.add({severity:'warn', summary: 'Advertencia:', detail: 'Se ha eliminado un producto del carrito de compras.', life: 3000});            
                
      }
    })  
  }
  
 
  functVisibleDialogVentasFacturas1(){   
    this.behaviorSubject.setData({origen:'ventas',visible:true}); 
  }

  functVisibleDialogEncabezado(){    
    this.behaviorSubject.setData({origen:'encabezado',visible:true});    
  }

  functOrigengBuscaProductos(){   
    this.behaviorSubject.setData({origen:'buscap',visible:true});    
  }

  functVisibleDialogOtrasVentas(){    
    this.behaviorSubject.setData({origen:'otrasv',visible:true});    
  }
  
  funct_mostrar_dialog_reimprimir_factura(){
    this.visible2 = true
  }
  
  functInpuFocus(){
    const nextElement = (document.querySelector(`[formControlName="codProducto"]`) as HTMLElement);
    nextElement.focus(); 
  }

  funct_reimprime_facturas(){
    this.idSecuencia.length =0;
    this.idSecuencia.push({      
      id_secuencia:this.formFactura.value.factura
    })    
    
    if (this.idSecuencia[0].id_secuencia != '' || this.idSecuencia[0].id_secuencia != 0) {
      this.reimprime.funct_imprime_facturas(this.idSecuencia);
      this.visible2 = false;
      this.functInpuFocus();
    } else {
      this.messageService.add({severity:'error', summary: 'Error:', detail: 'Debe incluir un número de factura', life: 3000});
    }
    
  }

  ngOnDestroy() {    
    this.dataService$?.unsubscribe();
  }

  funct_elimina_id_ventas(){
    Swal.fire({
          title: '¡Avertencia!',
          text: 'Todos los productos del carrito de compras se borrarán. ¿Está seguro?',
          icon: 'warning',
          width:'400px',               
          showCancelButton: true,
          confirmButtonColor: '#d33',
          cancelButtonColor:'#3085d6',
          confirmButtonText: 'Aceptar',
          cancelButtonText: 'Ignorar',          
        } as SweetAlertOptions).then((result) => {
          if (result.value) {
            this.eliminaVentas.funct_elimina_id_ventas(this.products).subscribe({
              next:data=>{               
                if (data == null) {                
                  setTimeout(()=>{
                    this.functRetornaVentas();
                    this.habilitado = false;
                    this.functInpuFocus(); 
                    this.messageService.add({severity:'warn', summary: 'Advertencia:', detail: 'Los productos del carrito de compras fueron eliminados.', life: 3000});
                  },1000)                                                      
                }                            
              }
            })            
          }
      });   
  }

  onRowSelect(event:any) {              
    this.retornaVinculos.funct_retorna_vinculos(event.data.codProd).subscribe({
      next:data=>{
        const objData = JSON.stringify(data);
        const obj = JSON.parse(objData);                                                                                    
          if (obj != null) {
            this.eliminaVentas.functEliminaVentasService(this.elimina_paquete_producto[0]).subscribe({
              next:data=>{
                this.registraVentas.functRegistraVentasService(obj[0].producto,this.origen_venta,this.openventas,this.idApertCaja,this.factura).subscribe({
                  next:data=>{
                    this.functRetornaVentas();  
                    this.functInpuFocus(); 
                    this.visible = false;                          
                  }
                });                     
              }
            })                       
          }       
      }     
    })   
  }

  funct_show_dualog(product:any){
    this.elimina_paquete_producto.length = 0;
    this.retornaVinculos.funct_retorna_vinculos(product.codProd).subscribe({
      next:data=>{
        const objData = JSON.stringify(data);
        const obj = JSON.parse(objData); 
        this.producto_unidad.length = 0;         
        this.producto_unidad.push(obj[1].producto);
        this.visible = true; 
        this.elimina_paquete_producto.push({
          id:product.id,
          codProd:product.codProd
        });        
                
      }                       
       
    })       
    
  }

  on_checkbox_change(event:any) {
    if (event.checked == true) {
      this.isChecked = true;
      this.visible3 = true;
      this.habilitado = true
        
    } else {
      this.isChecked = false;  
      this.habilitado = false;         
    }    
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

  on_gialog_hide(){
    this.isChecked = false;
  }

  funct_registra_ventas_x_cobrar_c(){
    if (this.products.length > 0) {
      this.ventas_xc.funct_registra_ventas_x_cobrar_s(this.products, this.data3.value).subscribe({
        next:data=>{       
          this.eliminaVentas.funct_elimina_id_ventas(this.products).subscribe({
            next:data=>{
              setTimeout(()=>{
                this.functRetornaVentas();
                this.visible3 = false;
                this.functInpuFocus(); 
                this.messageService.add({severity:'warn', summary: 'Advertencia:', detail: 'Venta guardada exitosamente.', life: 3000});
              },1000)   
            }
          })
        }
      })    
    } else {
      this.messageService.add({severity:'warn', summary: 'Advertencia:', detail: 'No hay productos para asociar al cliente selecionado.', life: 3000});
    }  
  }

  funct_retorna_one_cliente_c(data:any){    
    this.codigo_venta = 0;    
    this.r_cliente.funct_retorna_one_cliente(data.value).subscribe({
      next:data=>{
        const objData = JSON.stringify(data);
        const obj = JSON.parse(objData);        
        for (let index = 0; index < obj.length; index++) {          
          this.data3.get('codigo_venta')?.setValue(parseInt(obj[index].codigo_venta));        
        }                 
      }
    })
  }
}





 




import { ChangeDetectorRef, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CodigoProducto } from 'src/app/interfaces/ventas/codigo_venta.interface';
import { RetornaProductoService } from 'src/app/services/productos/retorna_productos.service';
import { RegistraVentaProductosService } from 'src/app/services/ventas/registra_ventas.service';
import { BehaviorSubjectService } from 'src/app/services/behaviorSubject/behaviorsubject.service';
import { Subscription } from 'rxjs';
import { FormVentas1Component } from '../../ventas/FormVentas1/formventas1.component';


@Component({
  selector: 'app-otras-ventas',
  templateUrl: './otras-ventas.component.html',
  styleUrls: ['./otras-ventas.component.scss']
})
export class OtrasVentasComponent implements OnDestroy{ 
  @ViewChild('inputText4') inputText?: ElementRef;
  data:FormGroup = new FormGroup({});
  data2:FormGroup = new FormGroup({});
  objData:any[] = []; 
  selectedProduct1?: CodigoProducto; 
  visible:boolean=false;
  visibleEnc:boolean=false;
  dataService$?: Subscription;
  origen_venta:string='Ventas-1';
  openventas:string='abierto1';
  closeventas:string='cerrado1';
  idApertCaja?:number;
  idVentas:number=0; 
  factura:number =0;

  constructor(
    private messageService: MessageService,
    private retornaProductos: RetornaProductoService,
    private registraVentas: RegistraVentaProductosService,
    private behaviorSubject : BehaviorSubjectService,    
    private formVenta: FormVentas1Component, 
    private cdr: ChangeDetectorRef,
    private fb: FormBuilder, 
  ){
    this.dataService$= this.behaviorSubject.getData().subscribe({
      next:data=>{
        if (data.origen == 'otrasv') {
          this.visible = data.visible;   
         }           
      },error: error=>{
        console.log("ErrorBehavior: ",error);            
      }
    });
  }

  ngOnInit() {    
      this.data = this.fb.group({
        dlCodProducto:[null , Validators.required]
      });
  
      this.data2 = this.fb.group({
        codProd:[null , Validators.required],
        descripcion:[null , Validators.required],
        existencia:[null , Validators.required],
        cant:[null , Validators.required],
        precio_venta:[null , Validators.required],
        precio_compra:1
      });
       
      this.formVenta.functRetornaVentas();
      this.cdr.detectChanges();   
      this.visible=false
  }

  functRetornaProducto(){
    this.retornaProductos.funct_retorna_vinculo_productos(this.data.value.dlCodProducto).subscribe({
      next:obj=>{
        const objData = JSON.stringify(obj);
        const data = JSON.parse(objData); 
        this.objData.length =0;                                                             
        if (data[0].producto != null) {                
          this.objData.push({
            codProd:data[0].producto.codProd,
            descripcion:data[0].producto.descripcion,
            existencia:data[0].producto.existencia,
            cantidad:1,           
            precio_compra:1,
            precio_venta:0 
          });
          this.data2.get('codProd')?.setValue(this.objData[0].codProd);
          this.data2.get('descripcion')?.setValue(this.objData[0].descripcion);
          this.data2.get('existencia')?.setValue(this.objData[0].existencia);
          this.data2.get('cant')?.setValue(1); 
          this.data.setValue({dlCodProducto:''});
          const nextElement = (document.querySelector(`[formControlName="precio_venta"]`) as HTMLElement);
          nextElement.focus();                                       
        } else{
          this.messageService.add({severity:'error', summary:'Product Selected', detail:'El producto que intenta vender no existe en base de datos'});
        }       
        
      }
    })    
  }

  functRegistraVenta() { 
    const estado_apertura=localStorage.getItem('estado_apertura');    
    let get_id_caja = localStorage.getItem('id_caja');
    let factura = localStorage.getItem('factura');
    if (estado_apertura == 'true') {    
      this.registraVentas.functRegistraVentasService(this.data2.value,this.origen_venta,this.openventas,get_id_caja,factura).subscribe({
        next:data=>{
          this.objData.length=0; 
          this.data.reset();  
          this.visible=false;     
          this.formVenta.functRetornaVentas(); 
          this.formVenta.functInpuFocus();
          this.data2.get('codProd')?.setValue('');
          this.data2.get('descripcion')?.setValue('');
          this.data2.get('existencia')?.setValue('');
          this.data2.get('cant')?.setValue(''); 
          this.data2.get('precio_venta')?.setValue('');        
        }
      })    
    } else {
      this.messageService.add({severity:'warn', summary:'Adventencia:', detail:'Antes de iniciar operación, debe generar apertura de caja',life: 3000});
    }  
    
  }

  ngOnDestroy(): void {
    this.dataService$?.unsubscribe();
  } 
  
  functInpuFocus(){     
    this.inputText?.nativeElement.focus();
  }  
  
}

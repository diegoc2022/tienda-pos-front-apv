import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductosService } from '../../services/productos/crea_productos.service';
import { MessageService } from 'primeng/api';
import { ProveedoresService } from 'src/app/services/proveedores/proveedores.service';
import { ProveedoresInterface } from 'src/app/interfaces/proveedores/proveedores.interface';
import { format } from 'date-fns';
import { VinculosService } from 'src/app/services/vinculos/vinculos.service';
import { Dropdown } from 'primeng/dropdown';



@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent {

  @ViewChild('dropdown') dropdown!: Dropdown;
  formProductos: FormGroup = new FormGroup({});
  data_proveedor: ProveedoresInterface[]=[];
  fecha_actual?:string;
  date: Date = new Date();


  constructor( 
    private fb: FormBuilder,
    private productosServices: ProductosService,
    private proveedorServices:ProveedoresService,    
    private messageService:MessageService,
    private vinculosservice: VinculosService,     
    )
    {
      this.proveedorServices.funct_retorna_proveedores().subscribe({
        next:data=>{
          const objP = JSON.stringify(data);
          const objP2 = JSON.parse(objP);
          this.data_proveedor = objP2 ;
        }
      });     
      
    }

  ngOnInit(): void {
    this.formProductos = this.fb.group({   
      codProd: ['', Validators.required],
      nombre: ['', Validators.required],
      codProv:['',Validators.required]      
    });    
    this.fecha_actual = format(this.date, 'yyyy-MM-dd HH:mm:ss'); 
       
  }

  on_enter_codigo_producto(event:any){
    if (event.code =="Enter") {             
        const nextElement = (document.querySelector(`[formControlName="nombre"]`) as HTMLElement);
        nextElement.focus();    
    }             
  }

  on_enter_nombres_producto(event:any){
    if (event.code =="Enter") {             
      this.dropdown.focus();
      this.dropdown.show();
    }             
  }
  
  functGuardarNuevoProducto(){    
    this.productosServices.funct_crea_productos(this.formProductos.value).subscribe({
      next:resp =>{
          const obj = JSON.stringify(resp);
          const obj2 = JSON.parse(obj);                     
          if (obj2.code == 409) {                    
            this.messageService.add({ severity: 'error', summary: 'Advertencia:', detail: obj2.msg });
            return;   
          }else{
            const data={
              codigoInic:obj2.codProd,
              codigoVinc:obj2.codProd
            }           
            this.vinculosservice.functRegistraVinculosService(data).subscribe({
              next:data=>{              
                this.messageService.add({ severity: 'info', summary: 'Advertencia:', detail: 'Producto guardado correctamente',life: 3000});
                this.formProductos.reset(); 
                const nextElement = (document.querySelector(`[formControlName="codProd"]`) as HTMLElement);
                nextElement.focus();           
              },error: error=>{
                this.messageService.add({ severity: 'error', summary: 'Create producto:', detail:error,life: 3000});            
              }
            });          
          } 
        }      
      })

    }

}


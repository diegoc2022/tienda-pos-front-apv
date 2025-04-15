import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { format } from 'date-fns';
import { MessageService } from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import { InputNumber } from 'primeng/inputnumber';
import { ComprasFacturasService } from 'src/app/services/compras-facturas/compras_facturas.service';
import { ComprasHistoricoService } from 'src/app/services/compras-historico/compras-historico.service';
import { ComprasService } from 'src/app/services/compras/compras.service';
import { InventarioService } from 'src/app/services/inventario/inventario.service';
import { VinculosService } from 'src/app/services/vinculos/vinculos.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrl: './compras.component.scss'
})
export class ComprasComponent implements OnInit{  
  @ViewChild('varios') dropdown?: Dropdown; 
  @ViewChild('miInputNumber') inputNumberRef!: InputNumber;
  @ViewChild('precioVenta') inputNumberRef2?: any;

  formCompras: FormGroup = new FormGroup({});
  formCompras2: FormGroup = new FormGroup({});
  formCompras3: FormGroup = new FormGroup({});
  formCompras4: FormGroup = new FormGroup({});
  date: Date = new Date();
  fecha_actual?:string;
  sub_total_sin_iva:number=0;
  total_descuento:number=0;
  total_iva2:number=0;
  total_icui:number=0; 
  costo_total_con_iva:number=0; 
  sub_total_con_desc:number=0;
  consto_unidad_sin_iva:number=0;
  consto_unidad_con_iva:number=0;
  precio_venta_und_con_iva:number=0;
  precio_venta:number=0;
  utilidad:number=0;
  valor_iva:number =0;
  valor_icui:number=0;
  sub_total_item_fact:number=0;
  total_item_desc:number=0;
  total_item_iva:number=0;
  total_item_icui:number=0;
  total_item_factura:number=0;
  total_registros:number=0;
  existencia:number=0;
  codigo_prod:string=''; 
  tipo_compra:any[]=[];
  total_factura:number=0; 
  display: boolean = false;  
  products: any[]=[];
  selectedProduct1:any[]=[];
  sub_total_form_fact:number=0;
  total_form_desc:number=0;
  total_form_iva:number=0;
  total_form_icui:number=0;
  total_form_factura:number=0;
  habilitado:boolean = false;
  
  
  constructor( 
    private fb: FormBuilder,   
    private messageService: MessageService,     
    private compras:ComprasService,
    private comprasFacturas:ComprasFacturasService,
    private retornaVinculos:VinculosService, 
    private inventario:InventarioService,
    private compras_h:ComprasHistoricoService
  ){
    this.tipo_compra = [
      {name: '100-Varios', code: '100'}      
  ];
  } 
   
  ngOnInit(): void {
    this.formCompras = this.fb.group({
      factura:[null, Validators.nullValidator], 
      varios:[null, Validators.nullValidator]       
    })
    
    this.formCompras2 = this.fb.group({
      codProd:[null, Validators.nullValidator], 
      descrip:[null, Validators.nullValidator],       
      precio_und:[null, Validators.nullValidator],
      cantidad:[null, Validators.nullValidator],
      costo_sin_iva:[null, Validators.nullValidator], 
      desc:[null, Validators.nullValidator],
      total_desc:[null, Validators.nullValidator],
      iva:[null, Validators.nullValidator],
      totaliva:[null, Validators.nullValidator],
      icui:[null, Validators.nullValidator],
      totalicui:[null, Validators.nullValidator],          
      total_costo:[null, Validators.nullValidator],
      costo_und:[null, Validators.nullValidator], 
      utilidad:[null, Validators.nullValidator],
      precioVenta:[null, Validators.nullValidator]
    })

    this.formCompras3 = this.fb.group({
      total_descuento:[null, Validators.nullValidator],
      total_iva:[null, Validators.nullValidator],
      total_icui:[null, Validators.nullValidator], 
      sub_total:[null, Validators.nullValidator], 
      total_factura:[null, Validators.nullValidator],  
         
    })

    this.formCompras4 = this.fb.group({
      total_descuento2:[null, Validators.nullValidator],
      total_iva2:[null, Validators.nullValidator],
      total_icui2:[null, Validators.nullValidator], 
      sub_total2:[null, Validators.nullValidator], 
      total_factura2:[null, Validators.nullValidator],  
         
    })
    this.habilitado = false;
    this.funct_retorna_compras();   
    this.fecha_actual = format(this.date, 'yyyy-MM-dd HH:mm');   
  }
  
  on_enter_factura(event:any): void {   
    if (event.code =="Enter") {      
      this.comprasFacturas.functGetComprasFacturasService(this.formCompras.value.factura).subscribe({
        next:data=>{
          const objData = JSON.stringify(data);
          const count = JSON.parse(objData);                  
          if (count > 0) {         
            this.messageService.add({severity:'error', summary: 'Error: ', detail: 'Factura Nro: '+this.formCompras.value.factura.toUpperCase()+ ' ya existe en base de datos'});
          } else {          
            if (this.dropdown) {
              this.dropdown.focus();
              this.dropdown.show();
            }            
          }       
        },
        error: (error) => {
          this.messageService.add({severity:'error', summary: 'Error_compras_h:', detail: error, life: 3000});
          this.messageService.clear();   
        }
      })
    }
    
  }

  on_enter_codigo_producto(event:any): void {     
    if (event.code =="Enter") {       
      this.retornaVinculos.funct_retorna_vinculos(this.formCompras2.value.codProd).subscribe({
        next:data=>{
          const objData = JSON.stringify(data);
          const obj = JSON.parse(objData);                        
          if (obj.length > 0) {          
            this.formCompras2.get('descrip')?.setValue(obj[0].producto.descripcion);
            this.codigo_prod = obj[0].codigoProd2;
            this.existencia =parseInt(obj[0].producto.existencia);  
            const nativeInput = this.inputNumberRef?.input?.nativeElement;
            nativeInput?.focus();        
          } else{
            this.messageService.add({severity:'error', summary:'Product Selected', detail:'Este producto no existe en base de datos, debe crearlo primero'});
          }
         },
         error: (error) => {
          this.messageService.add({severity:'error', summary: 'Error_compras_h:', detail: error, life: 3000});
          this.messageService.clear();   
        }
      })    
    }
  }

  on_enter_precio_unitario(event:any): void {  
    if (event.code =="Enter") {
      this.consto_unidad_sin_iva = this.formCompras2.value.precio_und;
      const nextElement = (document.querySelector(`[formControlName="cantidad"]`) as HTMLElement);
      nextElement.focus();
    }
  }

  on_enter_cantidad(event:any): void {  
    if (event.code =="Enter") {
      this.sub_total_sin_iva =this.formCompras2.value.precio_und *  parseInt(this.formCompras2.value.cantidad);      
      this.formCompras2.get('costo_sin_iva')?.setValue(this.sub_total_sin_iva);    
      const nextElement = (document.querySelector(`[formControlName="desc"]`) as HTMLElement);
      nextElement.focus();
    }
  }

  on_enter_sub_total(event:any): void {  
    if (event.code =="Enter") {      
      const nextElement = (document.querySelector(`[formControlName="desc"]`) as HTMLElement);
      nextElement.focus();
    }
  }

  on_enter_descuento(event:any): void {  
    if (event.code =="Enter") {
      if (this.formCompras2.value.precio_und >0) {    
        this.total_descuento =this.formCompras2.value.costo_sin_iva *  this.formCompras2.value.desc / 100;                      
        this.formCompras2.get('total_desc')?.setValue(this.total_descuento.toFixed(2));
        const nextElement = (document.querySelector(`[formControlName="iva"]`) as HTMLElement);
        nextElement.focus();
      }     
    }
  }
  
  on_enter_iva(event:any): void {  
    if (event.code =="Enter") {    
      if (this.formCompras2.value.precio_und >0) {
        this.sub_total_con_desc = this.sub_total_sin_iva - this.total_descuento;     
        this.total_iva2 = this.sub_total_con_desc *  this.formCompras2.value.iva / 100;     
        this.formCompras2.get('totaliva')?.setValue(this.total_iva2.toFixed(2));
        const nextElement = (document.querySelector(`[formControlName="icui"]`) as HTMLElement);
        nextElement.focus();      
        
      }
      
    }
  }
  
   
  on_enter_icui(event:any): void {  
    if (event.code =="Enter") {
      if (this.formCompras2.value.precio_und >0) {
        this.sub_total_con_desc = this.sub_total_sin_iva - this.total_descuento;
        this.total_icui =this.sub_total_con_desc *  this.formCompras2.value.icui / 100;
        this.costo_total_con_iva = this.sub_total_con_desc + this.total_iva2 + this.total_icui;        
        this.valor_iva = this.consto_unidad_sin_iva * this.formCompras2.value.iva / 100;
        this.valor_icui = this.consto_unidad_sin_iva * this.formCompras2.value.icui / 100; 
        this.consto_unidad_con_iva = this.consto_unidad_sin_iva + this.valor_iva + this.valor_icui;  
        this.formCompras2.get('totalicui')?.setValue(this.total_icui.toFixed(2));  
        this.formCompras2.get('total_costo')?.setValue(Math.round(this.costo_total_con_iva));
        this.formCompras2.get('costo_und')?.setValue(Math.round(this.consto_unidad_con_iva));
        this.sub_total_form_fact = Math.round(this.sub_total_item_fact) + Math.round(this.sub_total_con_desc);
        this.total_form_desc = Math.round(this.total_descuento);
        this.total_form_iva =Math.round(this.total_item_iva) + Math.round(this.total_iva2);
        this.total_form_icui = Math.round(this.total_item_icui) + Math.round(this.total_icui);
        this.total_form_factura = Math.round(this.total_item_factura) + Math.round(this.costo_total_con_iva)
        const nextElement = (document.querySelector(`[formControlName="utilidad"]`) as HTMLElement);
        nextElement.focus();
      }
      
    }
  }
  
  on_enter_total_costo(event:any): void {  
    if (event.code =="Enter") {    
      if (this.formCompras2.value.precio_und >0) {        
        const nextElement = (document.querySelector(`[formControlName="utilidad"]`) as HTMLElement);
        nextElement.focus();      
        
      }
      
    }
  }
  
  on_enter_utilidad(event:any): void {  
    if (event.code =="Enter") {
      this.utilidad = this.consto_unidad_con_iva * parseInt(this.formCompras2.value.utilidad) / 100
      this.precio_venta = this.consto_unidad_con_iva + this.utilidad;
      this.formCompras2.get('precioVenta')?.setValue(Math.round(this.precio_venta));
      const nativeInput = this.inputNumberRef2?.input?.nativeElement;
      nativeInput?.focus();    
    }
  }
  
  
 funct_registra_compras(){
    if (this.formCompras2.value.utilidad > 0) {
      this.habilitado = true; 
      this.compras.functCreateCompras(this.formCompras.value,this.formCompras2.value).subscribe({
        next:data=>{      
          this.formCompras2.get('codProd')?.setValue('');
          this.formCompras2.get('descrip')?.setValue('');    
          this.formCompras2.get('precio_und')?.setValue('');
          this.formCompras2.get('cantidad')?.setValue('');
          this.formCompras2.get('costo_sin_iva')?.setValue('');
          this.formCompras2.get('desc')?.setValue('');
          this.formCompras2.get('total_desc')?.setValue('');
          this.formCompras2.get('iva')?.setValue('');
          this.formCompras2.get('totaliva')?.setValue('');
          this.formCompras2.get('icui')?.setValue('');
          this.formCompras2.get('totalicui')?.setValue('');
          this.formCompras2.get('total_costo')?.setValue('');
          this.formCompras2.get('costo_und')?.setValue('');
          this.formCompras2.get('utilidad')?.setValue('');  
          this.formCompras2.get('precioVenta')?.setValue(''); 
          
          this.messageService.add({severity:'info', summary: 'Informativo', detail: 'Compra registrada exitosamente'});
          this.funct_retorna_compras();
          setTimeout(()=>{
            this.habilitado = false;        
            const nextElement = (document.querySelector(`[formControlName="codProd"]`) as HTMLElement);
            nextElement.focus();            
          },2000)        
        }      
      });  
    }else{
      this.messageService.add({severity:'warn', summary: 'Advertencia', detail: 'El campo utilidad no puede estar vacio o en cero'});
    }   
}

funct_retorna_compras(){
  this.compras.functRetornaCompras().subscribe({
    next:data=>{      
      const objData = JSON.stringify(data);
      const obj = JSON.parse(objData);         
      this.sub_total_item_fact = 0;
      this.total_item_desc = 0;
      this.total_item_iva = 0;
      this.total_item_icui = 0;
      this.total_item_factura = 0;      
      this.products.length = 0;
      for (let index = 0; index < obj.length; index++) {
          this.sub_total_item_fact += Math.round(obj[index].subtotal) - Math.round(obj[index].total_descuento);
          this.total_item_desc += Math.round(obj[index].total_descuento);
          this.total_item_iva += Math.round(obj[index].total_iva);
          this.total_item_icui += Math.round(obj[index].total_icui); 
          this.total_item_factura += Math.round(obj[index].total_compras);       
          this.products.push(obj[index]);        
      }
      this.total_registros = obj.length;      
    },
    error: (error) => {
      this.messageService.add({severity:'error', summary: 'Error_compras:', detail: error, life: 3000});      
    }
  })      
}

funct_elimina_item_compras(product:any){    
  this.compras.functEliminaItemCompras(product).subscribe({
    next:data=>{        
      this.messageService.add({severity:'warn', summary: 'Advertencia:', detail: 'Se ha eliminado un producto de la lista de compras.', life: 3000}); 
      this.funct_retorna_compras();
      this.messageService.clear();                
    },
    error: (error) => {
      this.messageService.add({severity:'error', summary: 'Error_compras:', detail: error, life: 3000});      
    }
  })  
}

funct_registra_compras_historico(){
  this.habilitado = true; 
  this.compras_h.funct_guarda_compras_historico(this.products).subscribe({
    next:data=>{
        this.inventario.funct_edita_compras_inventario(this.products).subscribe({
          next:data=>{
            this.comprasFacturas.functCreateComprasFacturas(this.products).subscribe({
              next:data=>{
                this.compras.functEliminaFacturaCompras(this.products).subscribe({
                  next:data=>{
                    setTimeout(()=>{
                      this.habilitado = false;
                      this.habilitado = false;
                      this.sub_total_form_fact = 0;
                      this.total_form_desc = 0;
                      this.total_form_iva = 0;
                      this.total_form_icui = 0;
                      this.total_form_factura = 0;
                      this.funct_retorna_compras();
                      this.display = false;
                      this.formCompras.get('factura')?.setValue('');
                      this.messageService.add({severity:'success', summary: 'Informativo:', detail: 'Item factura guardada correctamente.', life: 3000});                                           
                      const nextElement = (document.querySelector(`[formControlName="factura"]`) as HTMLElement);
                      nextElement.focus();                    
                    },1000)      
                  },
                  error: (error) => {
                    this.messageService.add({severity:'error', summary: 'Error_elimina_comp:', detail: error, life: 3000});              
                  }
                })          
              }
            })              
          },
          error: (error) => {
            this.messageService.add({severity:'error', summary: 'Error_inv:', detail: error, life: 3000});              
          }
        })       
    },
    error: (error) => {
      this.messageService.add({severity:'error', summary: 'Error_compras_h:', detail: error, life: 3000});
      this.messageService.clear();   
    }
  })
}

show_dialog() {
  this.display = true;  
}

openDialog(){
  this.display = false
}

}

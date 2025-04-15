import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ImprimeCuadreCajaService } from 'src/app/services/impresion/imprime-cuadre-caja.service';
import { RetornaVentasService } from 'src/app/services/ventas/retorna_ventas.service';
import { AperturaCajaService } from 'src/app/services/caja/caja';
import { Router } from '@angular/router';


@Component({
  selector: 'app-imprime-cuadre-caja',
  templateUrl: './cuadre-caja.component.html',
  styleUrls: ['./cuadre-caja.component.scss']
})
export class CuadreCajaComponent implements OnInit{
  formId: FormGroup = new FormGroup({});
  ventasProductos: any[]=[];  
  venta_total:number = 0;
  total_efectivo:number =0;
  total_cambio:number =0;
  idCaja:number=0;
  form_fecha:Date = new Date();
  fecha_actual?:string;
  ventasData:any[] =[];
  total_varios:number =0;
  base_caja:number =0;
  total_ventas_dia:any[] = [];
  otras_ventas:number =0;
  
  constructor(
    private retornaVentas:RetornaVentasService,
    private apertura:AperturaCajaService,   
    private imprimeCuadreCaja:ImprimeCuadreCajaService,   
    private fb: FormBuilder, 
    private router: Router
  ){}
  
  ngOnInit(): void {
    this.formId = this.fb.group({
      idCaja:[null , Validators.required]
    });  
    this.funct_retorna_apertura_caja();    
  }
  
  funct_retorna_apertura_caja(){  
    this.apertura.funct_retorna_apertura_caja().subscribe({
      next:data=>{
        this.idCaja=0; 
        this.fecha_actual=''; 
        this.base_caja =0;     
        const objData = JSON.stringify(data);
        const obj = JSON.parse(objData);                      
        this.idCaja=obj.id; 
        this.fecha_actual = obj.fecha_registro.substring(0, 10) 
        this.base_caja = obj.total_base; 
                  
      }
    })
  }

  funct_retorna_ventas_del_dia(){                
    return this.retornaVentas.functRetornaVentasIdCaja(this.formId.value.idCaja).subscribe({
      next:data=>{
        const objData = JSON.stringify(data);
        const result = JSON.parse(objData);                          
        this.ventasData.length = 0; 
        this.total_ventas_dia.length = 0,
        this.total_varios =0; 
        this.otras_ventas = 0;           
        for (let index = 0; index < result.length; index++) {         
          this.ventasData.push(result[index]);         
          if (result[index].codProd == 'OV100' || result[index].codProd == 'F100') {
            this.otras_ventas += result[index].subtotal
          }else{
            this.total_varios += result[index].subtotal 
          }        
        }
        this.total_ventas_dia.push({
          total:this.total_varios,
          base:this.base_caja,
          otrasv:this.otras_ventas,
          fecha:this.fecha_actual
        })       
                                         
      }
    })
  }

  functImprimeCuadreCaja(){
    this.funct_retorna_apertura_caja()   
    this.funct_retorna_ventas_del_dia()   
    setTimeout(()=>{        
      this.imprimeCuadreCaja.functImprimeCuadreCajaService(this.total_ventas_dia);                 
    },1000)     
  }
  
  funct_nex_model_exportar(){
    this.router.navigate(['/menu/migrar'])
  }

}

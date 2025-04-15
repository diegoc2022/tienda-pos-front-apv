import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';
import Swal, {SweetAlertOptions} from 'sweetalert2';
import { EliminaDataTemporalService } from 'src/app/services/ventas/elimina-data-temporal.service';
import { RegistraVentasHistoricosService } from 'src/app/services/ventas/registra_ventas_historicos.service';
import { RetornaVentasService } from 'src/app/services/ventas/retorna_ventas.service';
import { AperturaCajaService } from 'src/app/services/caja/caja';
import { ReactiveFormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-migrar-ventas',  
  templateUrl: './migrar-ventas.component.html',
  styleUrl: './migrar-ventas.component.scss',
  standalone: true,
  imports: [ReactiveFormsModule,ToastModule,TableModule],
})
export class MigrarVentasComponent {
  selectedProduct1?:any[];
  products: any[]=[];  
  idCaja:number=0;
  base_caja:number =0;
  fecha_actual?:string;

  constructor(    
    private message: MessageService,
    private ventas: RetornaVentasService,
    private eliminaDataTemporal:EliminaDataTemporalService, 
    private messageService: MessageService, 
    private registraVentasHistorico:RegistraVentasHistoricosService,
     private apertura:AperturaCajaService, 
  ){}

  ngOnInit() {
    this.funct_retorna_ventas_c();
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

  funct_retorna_ventas_c(){
    this.ventas.functRetornaVentasService().subscribe({
      next:data=>{
      const objData = JSON.stringify(data);
      const obj = JSON.parse(objData);     
      this.products.length = 0;
      for (let index = 0; index < obj.length; index++) {
        if (obj[index].estado == 'cerrado1') {             
              this.products.push(obj[index]);             
          } 
        } 
      }
    })
  }

  funct_migrar_ventas_del_dia_c(){    
      Swal.fire({
        title: 'Está seguro?',
        text: 'Que desea migrar las ventas del dia',
        icon: 'warning',
        width:'350',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Aceptar'
      } as SweetAlertOptions).then((result) => {
        if (result.value) {
          if (this.products.length > 0) {
            this.registraVentasHistorico.functRegistraVentasHistoricos(this.products).subscribe({
              next:data=>{
                this.eliminaDataTemporal.funct_elimina_ventas_temporal().subscribe({
                  next:data=>{
                    const objData = JSON.stringify(data);
                    const result = JSON.parse(objData);             
                    if (result.affected >0) {
                      this.apertura.funct_cierra_apertura_caja(this.idCaja).subscribe({
                        next:data=>{
                          localStorage.removeItem('estado_apertura');               
                          localStorage.setItem('base_caja','0');
                          this.products.length = 0;                    
                          this.messageService.add({severity:'success', summary: 'Información', detail: 'La ventas del dia se han migrado correctamente'});                     
                        }
                      })                   
                    }else{
                      this.messageService.add({severity:'warn', summary: 'Advertencia:', detail: 'No hay data para migrar'});               
                    }
                    
                  }
                })
              }
            })
          }else{
            this.messageService.add({severity:'warn', summary: 'Advertencia:', detail: 'Para migrar las ventas del dia primero debe generar el cuadre de caja'});               
          }         
        }
      });    
    }
  
}

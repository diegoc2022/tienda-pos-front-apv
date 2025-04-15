import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { RetornaComprasService } from 'src/app/services/compras/retorna-compras.service';
import { EditaCodigoService } from 'src/app/services/ventas/edita-codigo.service';
import { VinculosService } from 'src/app/services/vinculos/vinculos.service';
import Swal, {SweetAlertOptions} from 'sweetalert2';

@Component({
  selector: 'app-edita-codigos', 
  templateUrl: './edita-codigos.component.html',
  styleUrl: './edita-codigos.component.scss'
})
export class EditaCodigosComponent {
  dataBuscaProductos:any[]=[];
  selectedProduct1?:any[];
  value:string=''; 
  formData: FormGroup = new FormGroup({});
  formCheck: FormGroup = new FormGroup({});
  onChecked?:boolean = false;
  placeholder:string='Lea código nuevo';


  constructor(
    private retornaCompras:RetornaComprasService,   
    private editaCodigo:EditaCodigoService,
    private messageService: MessageService,   
    private vinculosservice: VinculosService,
    private fb: FormBuilder,
  ){
    
  }

  ngOnInit() {
    this.formData = this.fb.group({   
      codInicial: ['', Validators.required],
      codNuevo: ['', Validators.required]               
    });

    this.formCheck = this.fb.group({   
      option: ['', Validators.required],
                    
    });

    this.functRetornaProductos(); 
    this.onChecked = false 
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
     Swal.fire({
      title: 'Está seguro?',
      text: 'que desea eliminar el viculo para editar el código',
      icon: 'warning',
      width:'330px',     
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    } as SweetAlertOptions).then((result) => {
      if (result.value) {              
          setTimeout(()=>{
            this.value = event.data.codProd; 
            this.vinculosservice.funct_retorna_vinculos(event.data.codProd).subscribe({
              next:data=>{ 
                const objData = JSON.stringify(data);
                const obj = JSON.parse(objData);                                    
                if (obj) {
                  this.vinculosservice.functEliminaVinculosService(obj).subscribe({
                    next:data=>{
                      const nextElement = (document.querySelector(`[formControlName="codNuevo"]`) as HTMLElement);
                      nextElement.focus(); 
                      this.formData.get('codigoNuevo')?.setValue('');             
                    }
                  })
                }        
              }
            })   
          },1000)         
      }
    });   
  }

  clear(table: Table) {
    table.clear();
  }

  functEditaCodigo(){
    if (this.formData.invalid) {
      this.formData.markAllAsTouched();
      for (const key in this.formData.controls) {
        this.formData.controls[key].markAsDirty();
      }
      this.messageService.add({severity:'error', summary: 'Error:', detail: 'El campo lea código, es obligatorio'}); 
      return;
    }

    if (this.onChecked == false) {      
      this.editaCodigo.functEditaCodigoService(this.formData.value).subscribe({
        next:data=>{
          const objData = JSON.stringify(data);
          const obj = JSON.parse(objData);               
          if (obj.status != 409) {
            const data={
              codigoInic:this.formData.value.codNuevo,
              codigoVinc:this.formData.value.codNuevo
            }
            this.vinculosservice.functRegistraVinculosService(data).subscribe({
              next:data=>{
                this.messageService.add({severity:'info', summary: 'Informativo', detail: 'Código actualizado correctamente'});
                this.formData.get('codInicial')?.setValue(''); 
                this.formData.get('codNuevo')?.setValue('');                     
              },error: error=>{
                console.log("Error: ",error);            
              }
            });
                      
          } else {
            this.messageService.add({severity:'warn', summary: 'Advertencia', detail: obj.msg}); 
          }          
        }
      })
    } else {
      this.editaCodigo.funct_edita_nombre_producto(this.formData.value).subscribe({
        next:data=>{
          this.messageService.add({severity:'info', summary: 'Informativo', detail: 'Código actualizado correctamente'});
          this.formData.get('codInicial')?.setValue(''); 
          this.formData.get('codNuevo')?.setValue(''); 
          this.functRetornaProductos(); 
        }
      })
    }
    
  }

  onEnterCodigoProducto(event:any): void {    
    if (event.code =="Enter") {     
      const nextElement = (document.querySelector(`[formControlName="cantidad"]`) as HTMLElement);
      nextElement.focus();         
    }
  }

  onCheckboxChange(event: any) { 
    if (event.checked == true) {
      this.onChecked = event.checked;
      this.placeholder = 'Digite nombre producto';     
    } else {
      this.onChecked = false;
      this.placeholder = 'Lea código nuevo';    
    } 
  }

}

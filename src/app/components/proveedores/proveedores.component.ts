import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { format } from 'date-fns';
import { MessageService } from 'primeng/api';
import { Dropdown } from 'primeng/dropdown';
import { ProveedoresInterface } from 'src/app/interfaces/proveedores/proveedores.interface';
import { ProveedoresService } from 'src/app/services/proveedores/proveedores.service';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.scss']
})
export class ProveedoresComponent {

  @ViewChild('dropdown') dropdown!: Dropdown;
  formProveedor: FormGroup = new FormGroup({});
  data_proveedor: ProveedoresInterface[]=[];
  fecha_actual?:string;
  date: Date = new Date();
  options:any[] = [];

  constructor(
    private fb: FormBuilder,
    private proveedor:ProveedoresService,
     private messageService: MessageService,   
  ){


  }
  ngOnInit(): void {
    this.formProveedor = this.fb.group({
      nit: ['', Validators.required],   
      nombreProv: ['', Validators.required],
      dirProv: ['', Validators.required],
      telProv:['',Validators.required],
      ciudad:['',Validators.required]      
    });
    
    this.fecha_actual = format(this.date, 'yyyy-MM-dd HH:mm:ss'); 

    this.options = [
      {nombre: 'Bogota', value: 'Bogota' },
      { nombre: 'Medellin', value: 'Medellin' },
      { nombre: 'Cali', value: 'Cali'},
      { nombre: 'Pereira', value: 'Pereira'},
      { nombre: 'Ibague', value: 'Ibague' },
      { nombre: 'Bucaramanga', value: 'Bucaramanga' },
      { nombre: 'Barranquilla', value: 'Barranquilla' },
      {nombre: 'Sincelejo', value: 'Sincelejo' },
      {nombre: 'Cartagena', value: 'Cartagena' },
      {nombre: 'Pasto', value: 'Pasto' },
      {nombre: 'Cucuta', value: 'Cucuta' },
      {nombre: 'Manizales', value: 'Manizales' },

    ];
       
  }

  on_enter_codigo_proveedor(event:any){
    if (event.code =="Enter") {             
        const nextElement = (document.querySelector(`[formControlName="nombreProv"]`) as HTMLElement);
        nextElement.focus();    
    }             
  }

  on_enter_nombre_proveedor(event:any){
    if (event.code =="Enter") {             
        const nextElement = (document.querySelector(`[formControlName="dirProv"]`) as HTMLElement);
        nextElement.focus();    
    }             
  }

  on_enter_dir_proveedor(event:any){
    if (event.code =="Enter") {             
        const nextElement = (document.querySelector(`[formControlName="telProv"]`) as HTMLElement);
        nextElement.focus();    
    }             
  }

  on_enter_tel_proveedor(event:any){
    if (event.code =="Enter") {             
        this.dropdown.focus();
        this.dropdown.show();  
    }             
  }

  funct_registra_ptoverdor(){
    if (this.formProveedor.invalid) {
      this.formProveedor.markAllAsTouched();
      for (const key in this.formProveedor.controls) {
        this.formProveedor.controls[key].markAsDirty();
      }
      this.messageService.add({severity:'error', summary: 'Error:', detail: 'Todos los campos de este formulario, son obligatorios'});
      return;
    }

    this.proveedor.funct_create_proveedor(this.formProveedor.value).subscribe({
      next:data=>{
        const obj = JSON.stringify(data);
        const obj2 = JSON.parse(obj);     
      if (obj2.code != 409){
        this.formProveedor.get('nit')?.setValue('');
        this.formProveedor.get('nombreProv')?.setValue('');
        this.formProveedor.get('dirProv')?.setValue('');
        this.formProveedor.get('telProv')?.setValue('');
        this.formProveedor.get('ciudad')?.setValue('');
        const nextElement = (document.querySelector(`[formControlName="nit"]`) as HTMLElement);
        nextElement.focus();     
        this.messageService.add({severity:'info', summary:'Informativo:', detail: 'Registro guardado exitosamente'}); 
      } else {
        this.formProveedor.get('nit')?.setValue('');
        this.formProveedor.get('nombreProv')?.setValue('');
        this.formProveedor.get('dirProv')?.setValue('');
        this.formProveedor.get('telProv')?.setValue('');
        this.formProveedor.get('ciudad')?.setValue('');
        const nextElement = (document.querySelector(`[formControlName="nit"]`) as HTMLElement);
        nextElement.focus();     
        this.messageService.add({severity:'error', summary:'Error:', detail:obj2.msg, life:3000}); 
      }
      
          
    }})
  }
  
}


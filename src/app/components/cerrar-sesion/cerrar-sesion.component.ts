import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal, {SweetAlertOptions} from 'sweetalert2';

@Component({
  selector: 'app-cerrar-sesion',  
  templateUrl: './cerrar-sesion.component.html',
  styleUrl: './cerrar-sesion.component.scss'
})
export class CerrarSesionComponent{
  constructor(     
    private router: Router,
  ){}

  functCerrarSesion(){
    Swal.fire({
      title: 'Está seguro?',
      text: 'que desea cerrar sesión',
      icon: 'warning',
      width:'330px',     
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Aceptar'
    } as SweetAlertOptions).then((result) => {
      if (result.value) {
          localStorage.removeItem('token'); 
          localStorage.removeItem('user'); 
          setTimeout(()=>{
            this.router.navigate(['/']);
          },1000)         
      }
    });    
  }

 

}

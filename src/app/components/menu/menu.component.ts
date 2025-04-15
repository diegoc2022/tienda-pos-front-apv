import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit{
  items: MenuItem[]=[];
  ngOnInit(): void {
    if (1) {   
    this.items = [      
      {
        label: 'Facturación',
        icon: 'pi pi-fw pi-dollar',
        items: [
            {label: 'Apertura de caja', icon: 'pi pi-fw pi-caret-right',routerLink:['caja-apertura']}, 
            {label: 'Cierre de caja', icon: 'pi pi-fw pi-caret-right',routerLink:['cuadre-caja']}, 
            {label: 'Facturación', icon: 'pi pi-fw pi-caret-right',routerLink:['facturar']}            
        ]
      },
      {
        label: 'Compras',
        icon: 'pi pi-fw pi-folder-open',
        items: [
            {label: 'Entradas', icon: 'pi pi-fw pi-caret-right',routerLink:['compras']}                       
        ]
      },
      {
        label: 'Maestros',
        icon: 'pi pi-desktop',
        items: [            
            {label: 'Nuevo producto', icon: 'pi pi-fw pi-caret-right',routerLink:['nuevo-producto']}, 
            {label: 'Nuevo proveedor', icon: 'pi pi-fw pi-caret-right',routerLink:['nuevo-proveedor']},
            {label: 'Nuevo cliente', icon: 'pi pi-fw pi-caret-right',routerLink:['nuevo-cliente']},
            {label: 'Movimientos', icon: 'pi pi-fw pi-caret-right',routerLink:['movimientos']}         
        ]
      },
      {
        label: 'Otros',
        icon: 'pi pi-book',
        items: [
            {label: 'Descargas', icon: 'pi pi-fw pi-caret-right',routerLink:['downloads']},               
            {label: 'Asociación', icon: 'pi pi-fw pi-caret-right',routerLink:['vinculos']},           
            {label: 'Editar productos', icon: 'pi pi-fw pi-caret-right',routerLink:['edita-codigos']}, 
            {label: 'Editar precios', icon: 'pi pi-fw pi-caret-right',routerLink:['edita-precios']},
            {label: 'Editar Cantidad', icon: 'pi pi-fw pi-caret-right',routerLink:['edita-cantidad']},
            {label: 'Ventas x cobrar', icon: 'pi pi-fw pi-caret-right',routerLink:['cobros']}                            
        ]
      },      
      {
        label: 'Seguridad',
        icon: 'pi pi-fw pi-lock',
        items: [
            {label: 'Cerrar sesion', icon: 'pi pi-fw pi-caret-right',routerLink:['salir']}            
        ]
      }
  ]; 
  }
  
}
}

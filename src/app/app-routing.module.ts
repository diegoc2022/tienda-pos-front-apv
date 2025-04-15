import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/LoginComponent';
import { ProductosComponent } from "./components/productos/productos.component";
import { MenuComponent } from './components/menu/menu.component';
import { VinculosComponent } from './components/vinculos/vinculos.component';
import { CajaComponent } from './components/caja/apertura-caja/caja.component';
import { CuadreCajaComponent } from './components/caja/cuadre-caja/cuadre-caja.component';
import { ComprasComponent } from './components/compras/compras.component';
import { authGuard } from './auth.guard';
import { CerrarSesionComponent } from './components/cerrar-sesion/cerrar-sesion.component';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { EditaCodigosComponent } from './components/edita-codigos/edita-codigos.component';
import { MovimientosComponent } from './components/movimientos/movimientos.component';
import { EditaPreciosComponent } from './components/edita-precios/edita-precios.component';
import { EditaCantidadComponent } from './components/edita-cantidad/edita-cantidad.component';
import { FormVentas1Component } from './components/ventas/FormVentas1/formventas1.component';
import { Error404Component } from './components/error404/error404.component';
import { DownloadsComponent } from './components/downloads/downloads.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { MigrarVentasComponent } from './components/migrar-ventas/migrar-ventas.component';
import { VentasXCobrarComponent } from './components/ventas-x-cobrar/ventas-x-cobrar.component';

const routes: Routes = [    
    { path:'', title: 'login', component: LoginComponent},    
    { path: '', redirectTo: '/', pathMatch: 'full' },   
    { path:'menu', title: 'menu', component: MenuComponent,canActivate:[authGuard],    
    children: [
        {
          path: 'nuevo-producto',title:'Nuevo producto', component: ProductosComponent        
        },
        { 
          path: 'caja-apertura', title:'Apertura de caja', component: CajaComponent
        },
        { 
          path: 'compras', title:'Compras', component: ComprasComponent
        },  
        { 
          path: 'cuadre-caja', title:'Cierre de caja', component: CuadreCajaComponent
        },  
        { 
          path: 'facturar', title:'Facturación', component: FormVentas1Component
        }, 
        { 
          path: 'vinculos', title:'Vinculos', component: VinculosComponent
        },       
        { 
          path: 'nuevo-proveedor', title:'Proveedor', component: ProveedoresComponent
        },
        { 
          path: 'nuevo-cliente', title:'Crear cliente', component: ClientesComponent
        },
        { 
          path: 'salir', component: CerrarSesionComponent
        }, 
        { 
          path: 'movimientos',title:'Movimientos', component: MovimientosComponent
        },         
        { 
          path: 'edita-codigos', component: EditaCodigosComponent
        }, 
        { 
          path: 'edita-precios',title:'Editar precio', component: EditaPreciosComponent
        }, 
        { 
          path: 'edita-cantidad',title:'Editar cantidas', component: EditaCantidadComponent
        }, 
        { 
          path: 'downloads', title:'Descargas', component: DownloadsComponent
        },
        {
          path: 'migrar',title:'Migrar ventas', component: MigrarVentasComponent,          
        },  
        {
          path: 'cobros',title:'Ventas x cobrar', component: VentasXCobrarComponent,          
        },                  
      ],
    },
    { 
      path: 'movimientos', component: MovimientosComponent
    },   
      
    { path: '**',  title: 'Page-no-found-component',component:Error404Component},
    

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
 
})
export class AppRoutingModule{
 
}

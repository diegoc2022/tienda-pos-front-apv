import { ComprasHistoricoService } from './services/compras-historico/compras-historico.service';
import { EditaCodigoService } from './services/ventas/edita-codigo.service';
import { RetornaInventarioService } from './services/impresion/retorna-inventario.service';
import { InventarioService } from './services/inventario/inventario.service';
import { RegistraVentasHistoricosService } from './services/ventas/registra_ventas_historicos.service';
import { EliminaDataTemporalService } from './services/ventas/elimina-data-temporal.service';
import { ComprasFacturasService } from './services/compras-facturas/compras_facturas.service';
import { ComprasService } from './services/compras/compras.service';
import { DenominacionService } from './services/denominacion/denomin.service';
import { ImprimeCuadreCajaService } from './services/impresion/imprime-cuadre-caja.service';
import { AperturaCajaService } from './services/caja/caja';
import { RetornaIdVentasService } from './services/idVentas/retornaidventas.service';
import { VinculosService } from './services/vinculos/vinculos.service';
import { BehaviorSubjectotrasVentasService } from './services/behaviorSubject/behaviorsubjectotrasventas.service';
import { VehaviorCuadreCajaService } from './services/behaviorSubject/behaviorcuadrecaja.service';
import { CloseVentasService } from './services/ventas/close-ventas.service';
import { ImprimeFacturasService } from './services/impresion/imprime-facturas.service';
import { RetornaComprasService } from './services/compras/retorna-compras.service';

//Modulos
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { HttpClientModule } from '@angular/common/http';
import { MenubarModule } from 'primeng/menubar';
import { CommonModule } from '@angular/common';
import { ToastModule } from 'primeng/toast';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TabViewModule } from 'primeng/tabview';
import { SplitterModule } from 'primeng/splitter';
import { TableModule } from 'primeng/table';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { AvatarModule } from 'primeng/avatar';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { CalendarModule } from 'primeng/calendar';
import { MultiSelectModule } from 'primeng/multiselect';
import {CheckboxModule} from 'primeng/checkbox';


// Componentes
import { LoginComponent } from './components/login/LoginComponent';
import { ProductosComponent } from './components/productos/productos.component';
import { CajaComponent } from './components/caja/apertura-caja/caja.component';
import { MenuComponent } from './components/menu/menu.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormVentas1Component } from './components/ventas/FormVentas1/formventas1.component';
import { ProveedoresComponent } from './components/proveedores/proveedores.component';
import { OtrasVentasComponent } from './components/otras-ventas/otras-ventas1/otras-ventas.component';
import { CerrarSesionComponent } from './components/cerrar-sesion/cerrar-sesion.component';
//Servicios//
import { ProductosService } from './services/productos/crea_productos.service';
import { RetornaProductoService } from './services/productos/retorna_productos.service';
import { ProveedoresService } from './services/proveedores/proveedores.service';
import { ClasificacionService } from 'src/app/services/clasificacion/clasificacion.service';
import { RegistraVentaProductosService } from './services/ventas/registra_ventas.service';
import { RetornaVentasService } from './services/ventas/retorna_ventas.service';
import { UpdateVentasService } from './services/ventas/edita_ventas.service';
import { EliminaVentasService } from './services/ventas/elimina_ventas.service';
import { RetornaEncabezadoService } from './services/encabezado/retorna_encabezado.service';
import { BehaviorSubjectService } from './services/behaviorSubject/behaviorsubject.service';
import { BuscaProductosComponent } from './components/busca-productos/busca-prod1/busca-productos.component';
import { DialogVentasFacturas1Component } from './components/ventas-facturas/dialog-facturas1/dialog-ventas-facturas1.component';
import { VinculosComponent } from './components/vinculos/vinculos.component';
import { CuadreCajaComponent } from './components/caja/cuadre-caja/cuadre-caja.component';
import { ComprasComponent } from './components/compras/compras.component';
import { IdSecuenciaService } from './services/secuencia/id_secuencia.service';
import { InventarioComponent } from './components/inventario/inventario.component';
import { EditaCodigosComponent } from './components/edita-codigos/edita-codigos.component';
import { EditaVentaProductoService } from './services/ventas/edita-venta-producto.service';
import { MovimientosComponent } from './components/movimientos/movimientos.component';
import { EditaPreciosComponent } from './components/edita-precios/edita-precios.component';
import { EditaCantidadComponent } from './components/edita-cantidad/edita-cantidad.component';
import { Error404Component } from './components/error404/error404.component';
import { DownloadsService } from './components/downloads/services/downloads.service';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AutoComplete } from 'primeng/autocomplete';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,   
    ProductosComponent,
    CajaComponent,
    MenuComponent,
    FormVentas1Component,  
    ProveedoresComponent,   
    OtrasVentasComponent,
    BuscaProductosComponent,
    DialogVentasFacturas1Component,
    VinculosComponent,
    CuadreCajaComponent,
    EditaCodigosComponent,
    ComprasComponent,
    CerrarSesionComponent,
    InventarioComponent,
    EditaCodigosComponent,
    MovimientosComponent,
    EditaPreciosComponent,
    EditaCantidadComponent,
    Error404Component
    
   
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    AppRoutingModule,
    MenubarModule,
    HttpClientModule,
    CommonModule,
    BrowserAnimationsModule,
    ToastModule,
    TabViewModule,
    SplitterModule,
    TableModule,
    DropdownModule,
    InputNumberModule,
    DialogModule,
    AvatarModule,
    SweetAlert2Module,
    CalendarModule,
    MultiSelectModule,
    CheckboxModule    
  ],
  providers: [
    ComprasHistoricoService,
    EditaCodigoService,
    RetornaInventarioService,
    InventarioService,
    RegistraVentasHistoricosService,
    EliminaDataTemporalService,
    ComprasFacturasService,
    ComprasService,
    DenominacionService,
    EditaVentaProductoService,
    ImprimeCuadreCajaService, 
    AperturaCajaService,
    RetornaIdVentasService,
    VinculosService,
    BehaviorSubjectotrasVentasService,
    VehaviorCuadreCajaService,
    CloseVentasService,
    ImprimeFacturasService,
    RetornaComprasService,
    BehaviorSubjectService,
    RetornaEncabezadoService,
    EliminaVentasService,
    UpdateVentasService,
    RetornaVentasService,
    ProveedoresService,
    MessageService,
    RetornaProductoService,
    ProductosService,
    ClasificacionService,
    RegistraVentaProductosService,
    ConfirmationService,
    IdSecuenciaService,
    DownloadsService,
    provideAnimationsAsync(),
    AutoComplete
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }

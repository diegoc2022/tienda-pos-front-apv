export interface RegistraVentasInterface{
   
    id:number;  
    id_apertura_caja:number; 
    id_venta:number;   
    codProd:string;    
    descripcion:string;       
    cantidad:number;   
    existencia:number;
    precio_compra:number;
    precio_venta:number;   
    origen_venta:string;
    subtotal:number;
    vendedor:string;
    estado:string;
    factura:number;
    venta_por_und:boolean;

}
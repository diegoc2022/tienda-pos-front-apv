
import { Injectable, OnInit } from '@angular/core';
import { jsPDF } from 'jspdf';
import { RetornaVentasService } from '../ventas/retorna_ventas.service';

@Injectable({
  providedIn: 'root'
})
export class ImprimeFacturasService implements OnInit{ 
  dataProductos:any[]=[]; 
  subTotal:number=0;


  constructor(     
    private retornaVentas:RetornaVentasService
  ){}

  ngOnInit(): void {
    
  }
 

  funct_imprime_facturas(id:any){       
    let numFactura = id[0].id_secuencia
    this.retornaVentas.funct_retorna_ventas_facturas(numFactura).subscribe({
      next:data=>{
        const obj = JSON.stringify(data);
        const objData = JSON.parse(obj);   
        let yPos = 97; 
        const margin = 10;   
        const width = 100; 
        const height = 5000;
        const doc = new jsPDF({
          orientation: 'portrait',
          unit: 'mm', 
          format: [width,height]
        });
        const pageHeight = doc.internal.pageSize.height;
        doc.setFontSize(14);
        doc.setFont("Courier", "Bold");   
        doc.text('Autoservicio la perla verde',15,10);             
        doc.setFontSize(9)        
        doc.text('DIEGO ALBERTO CASTAÑO',20,16); 
        doc.setFontSize(10)       
        doc.text('NIT: 98614540',35,21);        
        doc.text('CRA 21 # 57C - 68',32,26);        
        doc.text('TEL: 6044286817 - 3015234983',25,31); 
        doc.setFont("Courier", " ");
        doc.text('=======================================================',3,40);    
        doc.setFontSize(10)
        doc.setFont("Courier", "Bold"); 
        if (objData[0].origen_venta === 'Ventas-1') {
        doc.text('REMISIÓN: '+ objData[0].factura,5,47);
        }    
        doc.text('FECHA: '+ objData[0].fecha_registro,54,47);
        doc.setFont("Courier", " ");
        doc.text('==================================================',3,54);
        doc.setFont("Courier", " ");   
        doc.text('CLIENTE: ?CONSUMIDOR FINAL',5,60); 
        doc.text('CÉDULA: 1234',5,65); 
        doc.text('DIRECCIÓN:',5,70); 
        doc.text('TELÉFONO:',5,75); 
        doc.setFont("Courier", " ");
        doc.text('=================================================',3,83);
        doc.setFontSize(11)
        doc.setFont("Courier", "Bold");
        doc.text("ARTICULOS",5,90);
        doc.text("CANT",55,90);
        doc.text("MONTO",75,90);
        doc.setFont("Courier", "Bold");    
        if (objData[0].origen_venta === 'Ventas-1') { 
          this.subTotal=0; 
          objData.forEach((item:any,index:any) => {
            this.subTotal += item.subtotal; 
            doc.setFontSize(10);
            doc.setFont("Courier","Bold"); 
            doc.text(item.descripcion.slice(0,25), 5, yPos);
            doc.text(item.cantidad.toString(), 60, yPos);
            doc.text('$'+ item.subtotal.toString(), 75, yPos);      
            yPos += 6;
          });
          
        }
        doc.text('=================================================',3,yPos);
        function formatCurrency(value:any, currencySymbol = "$") {
          return currencySymbol + parseInt(value).toLocaleString();
        }
        const valorFormateado = formatCurrency(this.subTotal);
        doc.setFontSize(11)
        doc.setFont("Courier", "Bold");
        doc.text('SUBTOTAL:',4,yPos +5); 
        doc.text(valorFormateado,72,yPos +5); 
        doc.setFont("Courier", "Bold"); 
        doc.text('EFECTIVO:',4,yPos + 10); 
        doc.text('$0',72,yPos +10);
        doc.text('CAMBIO:',4,yPos + 15); 
        doc.text('$0',72,yPos + 15);
        doc.text('=================================================',3,yPos + 22);
        doc.setFontSize(11)
        doc.setFont("Courier", "Bold");
        doc.text('¡Gracias por su compra!',25,yPos + 35); 
        doc.text('.',25,yPos + 50);
        doc.output('dataurlnewwindow');
            
      }})
  }
  

  
}

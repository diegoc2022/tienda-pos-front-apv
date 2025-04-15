
import { Injectable, OnInit } from '@angular/core';
import { jsPDF } from 'jspdf';


@Injectable()
export class ImprimeCuadreCajaService{
total_varios:number=0;
total_fluver:number=0;
total_bruto:number=0;
origen?:string;

constructor(){}

functImprimeCuadreCajaService(ventasDia:any) {    
    const width = 100; 
    const height = 200;
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm', 
        format: [width, height]
    });
   
    doc.setFontSize(14);
    doc.setFont('Courier','Bold');   
    doc.text('Autoservicios la Perla Verde',8,10);             
    doc.setFontSize(9)        
    doc.text('DIEGO ALBERTO CASTAÑO SALDARRIAGA',15,16); 
    doc.setFontSize(10)       
    doc.text('NIT: 20202020',30,21);        
    doc.text('CRA 21 # 57C - 68',25,26);        
    doc.text('TEL: 6044286817 - 3015234983',17,31); 
    doc.setFont('Courier','');  
    doc.text('============================================',3,45);
    doc.setFont('Courier','Bold');
    doc.text("CIERRE DE CAJA ",35,51);  
    doc.text("FECHA APERTURA: ",5,58);     
    doc.text(ventasDia[0].fecha,65,58);    
    doc.setFont('Courier','');
    doc.text('============================================',3,65);
    doc.setFontSize(11);
    doc.setFont('Courier','Bold');  
    doc.text("VENTAS VARIOS",5,73);   
    doc.text("MONTO",70,73);
    doc.setFont('Courier',''); 
    doc.text('========================================',3,80);
    doc.setFont('Courier','Bold');    
    function formatCurrency(value:any, currencySymbol = "$") {
      return currencySymbol + parseInt(value).toLocaleString();
    }
    const totalVarios = formatCurrency(ventasDia[0].total);  
    const totalBase = formatCurrency(ventasDia[0].base); 
    const totalFluver = formatCurrency(ventasDia[0].otrasv); 
    const totalBruto = parseInt(ventasDia[0].total) + parseInt(ventasDia[0].base) + parseInt(ventasDia[0].otrasv);       
    const total = formatCurrency(totalBruto); 
       
    doc.setFontSize(10);
    doc.setFont('Courier','Bold');  
    doc.text('VARIOS: ', 5, 87);   
    doc.text(totalVarios, 70, 87);  
    doc.text('BASE CAJA: ', 5, 94);   
    doc.text(totalBase, 70, 94);  
    doc.text('OTRAS VENTAS: ', 5, 101);     
    doc.text(totalFluver, 70, 101);  
    doc.setFont('Courier',''); 
    doc.text('============================================',3,108); 
    doc.setFontSize(11);
    doc.setFont('Courier','Bold'); 
    doc.text('TOTAL VENTAS DEL DIA:',4,116);  
    doc.text(total,70,116); 
    doc.text('.',5,140);   
    doc.output('dataurlnewwindow');   
    
}
}

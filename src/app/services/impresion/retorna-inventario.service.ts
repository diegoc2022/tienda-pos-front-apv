import { Injectable } from '@angular/core';
import { jsPDF } from 'jspdf';

@Injectable()
export class RetornaInventarioService {
constructor(){}

funct_imprime_inventario(data:any){     
    let yPos = 97;   
    const width = 216; 
    const height = 280;
    const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm', 
        format: [width, height]
    });
   
    doc.setFontSize(14);
    doc.setFont('Courier','Bold');   
    doc.text('Autoservicio la Perla Verde',7,10);             
    doc.setFontSize(9)        
    doc.text('DIEGO ALBERT CASTAÑO SALDARRIAGA',16,16); 
    doc.setFontSize(10)       
    doc.text('NIT: 20202020',35,21);        
    doc.text('CRA 21 # 57C - 68',32,26);        
    doc.text('TEL: 6044286817 - 3015234983',25,31); 
    doc.setFont('Courier','');  
    doc.text('=============================================',3,45);
    doc.setFont('Courier','Bold');
    doc.text("Inventario ",5,51);  
    doc.text("FECHA: ",5,57);   
    doc.setFont('Courier','');
    doc.text('=============================================',3,65);
    doc.setFontSize(11)
    doc.setFont("Courier", "Bold");
    doc.text("CODIGO",5,90);
    doc.text("ARTICULO",55,90);
    doc.text("STOCK",75,90);
    doc.setFont("Courier", "Bold");      
      for (let index = 0; index <data.length; index++) {       
        doc.setFontSize(10);
        doc.setFont("Courier","Bold"); 
        doc.text(data[index].codProd, 5, yPos);
        doc.text(data[index].descripcion, 60, yPos);
        doc.text(data[index].existencia.toString(), 75, yPos);      
        yPos += 6;              
      } 
      doc.text('=================================================',3,yPos + 22);   
    doc.output('dataurlnewwindow');
    
    }
}

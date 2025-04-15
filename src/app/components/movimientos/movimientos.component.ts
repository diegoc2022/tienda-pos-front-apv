import { Component } from '@angular/core';
import { format } from 'date-fns';

@Component({
  selector: 'app-movimientos', 
  templateUrl: './movimientos.component.html',
  styleUrl: './movimientos.component.scss'
})
export class MovimientosComponent {
  date: Date = new Date();
  fecha_actual?:string;

  ngOnInit(): void {
    this.fecha_actual = format(this.date, 'yyyy-MM-dd HH:mm'); 
  }

}

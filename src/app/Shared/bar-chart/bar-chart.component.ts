import { Component, Input } from '@angular/core';
import { Legend } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-bar-chart',
  imports: [BaseChartDirective],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css'
})
export class BarChartComponent {
  @Input({required: true}) data: {x: string, y: any}[];
  @Input({required: true}) label!: string;
  barChartData = {
    datasets: [{
      label: "Gastos por mês",
      data: [
        {x: 'Jan', y: 10000},
        {x: 'Fev', y: 100},
        {x: 'Mar', y: 1000},
        {x: 'Abr', y: 1500},
        {x: 'Mai', y: 530},
        {x: 'Jun', y: 540},
        {x: 'Jul', y: 10},
        {x: 'Ago', y: 10},
        {x: 'Set', y: 10},
        {x: 'Out', y: 10},
        {x: 'Nov', y: 10},
        {x: 'Dez', y: 10},]
    }]
  }
  options = {
    responsive: true,
    maintainAspectRatio: false
  }

}

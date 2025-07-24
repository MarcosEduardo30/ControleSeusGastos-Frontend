import { Component, Input, OnInit } from '@angular/core';
import { Legend, plugins } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-pie-chart',
  imports: [BaseChartDirective],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.css'
})
export class PieChartComponent implements OnInit {
  barChartData;
  ngOnInit(): void {
  this.barChartData = {
      labels: this.labels,
      datasets: [{
        data: this.data
      }]
    }
  }

  @Input({required: true}) data!: number[];
  @Input({required: true}) labels!: string[];

  
  options = {
    responsive: true,
    maintainAspectRatio: false
  }

  
}

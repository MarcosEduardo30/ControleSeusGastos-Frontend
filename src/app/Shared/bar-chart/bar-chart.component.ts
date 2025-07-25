import { Component, Input, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-bar-chart',
  imports: [BaseChartDirective],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.css'
})
export class BarChartComponent implements OnInit{
  @Input({required: true}) data!: {x: string, y: any}[];
  @Input({required: true}) label!: string;

  barChartData: {datasets: {label: string, data: {x: string, y: any}[]}[]}

  options = {
    responsive: true,
    maintainAspectRatio: false
  }

  ngOnInit(): void {
    this.barChartData = {
    datasets: [{
      label: this.label,
      data: this.data
    }]
  }
  }
}

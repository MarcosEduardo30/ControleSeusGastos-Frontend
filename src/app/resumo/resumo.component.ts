import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ResumoService } from './resumo.service';
import { resumo } from './Models/resumo.model';
import { BarChartComponent } from '../shared/bar-chart/bar-chart.component';
import { PieChartComponent } from '../shared/pie-chart/pie-chart.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-resumo',
  imports: [BarChartComponent, PieChartComponent, RouterLink],
  templateUrl: './resumo.component.html',
  styleUrl: './resumo.component.css'
})

export class ResumoComponent implements OnInit {

  private resumoService = inject(ResumoService);
  private destroyRef = inject(DestroyRef);
  resumo = this.resumoService.resumoUsuario;

  gastoPorMesData: {x: string, y: any}[] = [];
  gastoPorMesLabel = "Gastos por mês"

  //Variaveis temporárias, esses dados virão a partir do resumo depois
  categoriaData: number[] = [];
  categoriaLabels: string[] = [];

  ngOnInit(): void {
   const sub = this.resumoService.carregarResumo()
    .subscribe(response => {
        response.data.gastosPorMes.forEach(d => this.gastoPorMesData.push({x: d.mes,y:  d.valor}));
        
        response.data.gastosPorCategoria.forEach(d => {
          this.categoriaData.push(d.valor)
          this.categoriaLabels.push(d.categoria)
        })
      })

  this.destroyRef.onDestroy(() => sub.unsubscribe());
  }
}

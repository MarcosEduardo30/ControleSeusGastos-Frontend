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
  categoriaData = [300, 100, 200]
  categoriaLabels = ["Mercado", "Lazer", "Transporte"]

  ngOnInit(): void {
   const sub = this.resumoService.carregarResumo()
    .subscribe(r => {
        r.data.gastosPorMes.forEach(m => this.gastoPorMesData.push({x: m.mes,y:  m.valor}));
      })

  this.destroyRef.onDestroy(() => sub.unsubscribe());
  }
}

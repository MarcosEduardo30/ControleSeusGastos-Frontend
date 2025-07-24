import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ResumoService } from './resumo.service';
import { resumo } from './Models/resumo.model';
import { BarChartComponent } from '../shared/bar-chart/bar-chart.component';

@Component({
  selector: 'app-resumo',
  imports: [BarChartComponent],
  templateUrl: './resumo.component.html',
  styleUrl: './resumo.component.css'
})

export class ResumoComponent implements OnInit {

  private resumoService = inject(ResumoService);
  private destroyRef = inject(DestroyRef);
  resumo = this.resumoService.resumoUsuario;

  //Variaveis temporárias, esses dados virão a partir do resumo depois
  gastoPorMesData = [
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
  ;

  gastoPorMesLabel = "Gastos por mês"

  ngOnInit(): void {
    const sub = this.resumoService.carregarResumo().subscribe()
    this.destroyRef.onDestroy(() => sub.unsubscribe());
  }
}

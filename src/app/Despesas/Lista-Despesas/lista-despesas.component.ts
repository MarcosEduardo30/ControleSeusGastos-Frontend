import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { HeaderListaComponent } from './header-lista/header-lista.component';
import { DespesaComponent } from '../despesa/despesa.component';
import { DespesasService } from '../despesas.service';
import { FormDespesaService } from '../despesa-form/despesa-form.service';
import { DespesaFormComponent } from '../despesa-form/despesa-form.component';
import { despesa } from '../Models/despesa.model';

@Component({
  selector: 'app-lista-despesas',
  imports: [DespesaComponent, HeaderListaComponent, DespesaFormComponent],
  templateUrl: './lista-despesas.component.html',
  styleUrl: './lista-despesas.component.css'
})
export class ListaDespesasComponent implements OnInit{
  private despesaService = inject(DespesasService);
  private formDespesaService = inject(FormDespesaService);
  private destroyRef = inject(DestroyRef);

  nomeUsuario?: string;
  isFormsOpen = this.formDespesaService.isFormOpen;

  // despesas = this.despesaService.despesasUsuario;
  despesas: despesa[] = [];

      ngOnInit(): void {
          const sub = this.despesaService.CarregarDespesas().subscribe(
            value => {
              this.despesas = value.data;
            }
          );

          this.destroyRef.onDestroy(() => sub.unsubscribe())
      }

      onCriarClick(){
        this.formDespesaService.openForm();
      }

      onSortby(filtro: string){
        switch(filtro){
          case "MaiorValor":
            this.despesas.sort((a, b) => b.valor - a.valor)
            break;
          case "MenorValor":
            this.despesas.sort((a, b) => a.valor - b.valor)
            break;
          case "MaisRecente":
            this.despesas.sort((a, b) => {
              if (a.data > b.data){
                return -1
              }
              return 1;
            })
            break;
          case "MaisAntiga":
            this.despesas.sort((a, b) => {
              if (a.data < b.data){
                return -1
              }
              return 1;
            })
            break;
        }
      }
}

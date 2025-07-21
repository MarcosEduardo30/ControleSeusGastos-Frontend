import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { HeaderListaComponent } from './header-lista/header-lista.component';
import { DespesaComponent } from '../despesa/despesa.component';
import { DespesasService } from '../despesas.service';
import { FormDespesaService } from '../despesa-form/despesa-form.service';
import { DespesaFormComponent } from '../despesa-form/despesa-form.component';

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

  despesas = this.despesaService.despesasUsuario;

      ngOnInit(): void {
          const sub = this.despesaService.CarregarDespesas().subscribe();
          this.destroyRef.onDestroy(() => sub.unsubscribe())
      }

      onCriarClick(){
        this.formDespesaService.openForm();
      }


}

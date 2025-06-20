import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { HeaderListaComponent } from './header-lista/header-lista.component';
import { DespesaComponent } from '../despesa/despesa.component';
import { DespesasService } from '../despesas.service';

@Component({
  selector: 'app-lista-despesas',
  imports: [DespesaComponent, HeaderListaComponent],
  templateUrl: './lista-despesas.component.html',
  styleUrl: './lista-despesas.component.css'
})
export class ListaDespesasComponent implements OnInit{
          
  nomeUsuario?: string;
  isFormsOpen: boolean = false;
  private despesaService = inject(DespesasService);
  private destroyRef = inject(DestroyRef);

  despesas = this.despesaService.despesasUsuario;

      ngOnInit(): void {
        console.log("Entrou no on init")
          const sub = this.despesaService.CarregarDespesas().subscribe();
          this.destroyRef.onDestroy(() => sub.unsubscribe())
      }


}

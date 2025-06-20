import { Component, DestroyRef, inject, Input } from '@angular/core';
import { despesa } from '../Models/despesa.model';
import { DatePipe } from '@angular/common';
import { DespesasService } from '../despesas.service';
import { FormDespesaService } from '../despesa-form/despesa-form.service';

@Component({
  selector: 'app-despesa',
  imports: [DatePipe],
  templateUrl: './despesa.component.html',
  styleUrl: './despesa.component.css'
})
export class DespesaComponent {
  @Input({required: true}) Despesa!: despesa;
  private despesaService = inject(DespesasService);
  private formDespesaService = inject(FormDespesaService);
  private destroyRef = inject(DestroyRef);

  onExcluir(){
    const sub = this.despesaService.ExcluirDespesa(this.Despesa.id).subscribe();
    this.destroyRef.onDestroy(() => sub.unsubscribe())
  }

  onEditar(){
    const sub = this.formDespesaService.openEditForm(this.Despesa);
  }
}

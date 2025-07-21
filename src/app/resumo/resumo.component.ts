import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ResumoService } from './resumo.service';
import { resumo } from './Models/resumo.model';

@Component({
  selector: 'app-resumo',
  imports: [],
  templateUrl: './resumo.component.html',
  styleUrl: './resumo.component.css'
})

export class ResumoComponent implements OnInit {

  private resumoService = inject(ResumoService);
  private destroyRef = inject(DestroyRef);
  resumo = this.resumoService.resumoUsuario;

  ngOnInit(): void {
    const sub = this.resumoService.carregarResumo().subscribe()
    this.destroyRef.onDestroy(() => sub.unsubscribe());
  }
}

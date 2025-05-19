import { Component } from '@angular/core';
import { DespesaComponent } from './despesa/despesa.component';
import { HeaderListaComponent } from './header-lista/header-lista.component';

@Component({
  selector: 'app-lista-despesas',
  imports: [DespesaComponent, HeaderListaComponent],
  templateUrl: './lista-despesas.component.html',
  styleUrl: './lista-despesas.component.css'
})
export class ListaDespesasComponent {

}

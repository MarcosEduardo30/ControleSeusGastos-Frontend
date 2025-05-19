import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ListaDespesasComponent } from "./lista-despesas/lista-despesas.component";

@Component({
  selector: 'app-root',
  imports: [ListaDespesasComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Controle-Seus-Gastos';
}

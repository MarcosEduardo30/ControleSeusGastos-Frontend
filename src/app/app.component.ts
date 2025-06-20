import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormDespesaService } from './Despesas/despesa-form/despesa-form.service'; 
import { DespesaFormComponent } from './Despesas/despesa-form/despesa-form.component';
import { AuthenticationService } from './Autentication/Authentication.service';

@Component({
  selector: 'app-root',
  imports: [DespesaFormComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  formDespesaService = inject(FormDespesaService);
  authService = inject(AuthenticationService);

  isFormOpen = this.formDespesaService.isFormOpen;
  title = 'Controle-Seus-Gastos';

  ngOnInit(): void {
    this.authService.autoLogin();
  }

  onTesteClick(){
    this.formDespesaService.openForm();
  }
}

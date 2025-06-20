import { Component, inject } from '@angular/core';
import { AuthenticationService } from '../../../authentication/Authentication.service';
import { FormDespesaService } from '../../despesa-form/despesa-form.service';

@Component({
  selector: 'app-header-lista',
  imports: [],
  templateUrl: './header-lista.component.html',
  styleUrl: './header-lista.component.css'
})
export class HeaderListaComponent {
    private authService = inject(AuthenticationService);
    private formService = inject(FormDespesaService);
   
      onLogoutClick(){
        this.authService.logout();
      }

      onCriarClick(){
        this.formService.openForm();
      }
}

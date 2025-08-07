import { Component, inject, output } from '@angular/core';
import { AuthenticationService } from '../../../authentication/Authentication.service';
import { FormDespesaService } from '../../despesa-form/despesa-form.service';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-header-lista',
  imports: [RouterLink],
  templateUrl: './header-lista.component.html',
  styleUrl: './header-lista.component.css'
})
export class HeaderListaComponent {
    private authService = inject(AuthenticationService);
    private formService = inject(FormDespesaService);
    sortBy = output<string>();
    categoryFilter = output<string>();
   
      onLogoutClick(){
        this.authService.logout();
      }

      onCriarClick(){
        this.formService.openForm();
      }


      onSortByClick(sortBy: HTMLDivElement, categories: HTMLDivElement){
        sortBy.classList.toggle("hide");

        if(!categories.classList.contains("hide")){
          categories.classList.toggle("hide");
        }
      }

      onCategoriesClick(categories: HTMLDivElement, sortBy: HTMLDivElement){
        categories.classList.toggle("hide");

        if(!sortBy.classList.contains("hide")){
          sortBy.classList.toggle("hide");
        }
      }

      onSortBySelect(filtro: string){
        this.sortBy.emit(filtro);
      }

      onCategorySelect(category: string){
        this.categoryFilter.emit(category);
      }
}

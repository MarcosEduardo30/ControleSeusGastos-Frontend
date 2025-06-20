import { afterNextRender, Component, inject, ViewChild} from '@angular/core';
import { FormDespesaService } from './despesa-form.service';
import { FormsModule, NgForm } from '@angular/forms';
import { DespesasService } from '../despesas.service'; 
import { criarDespesaDto } from '../Models/DTOs/criarDespesa.dto';
import { editarDespesaDto } from '../Models/DTOs/editarDespesa.dto';
import { AuthenticationService } from '../../authentication/Authentication.service'; 

@Component({
  selector: 'app-despesa-form',
  imports: [FormsModule],
  templateUrl: './despesa-form.component.html',
  styleUrl: './despesa-form.component.css'
})

export class DespesaFormComponent{

  despesaFormService = inject(FormDespesaService);
  despesaService = inject(DespesasService);
  authService = inject(AuthenticationService);

  @ViewChild("despesa_form")
  Despesaform!: NgForm;
  valor!: number;
  data!: string;
  descricao: string = "";
  nome: string = "";

  isEdit = this.despesaFormService.isEdit;
  isFormOpen = this.despesaFormService.isFormOpen;

  constructor(){
    afterNextRender(() => {
      if (this.isEdit() && this.despesaFormService.despesaCarregada != undefined){
            this.valor = this.despesaFormService.despesaCarregada.valor;
            this.data = this.converteData(new Date(this.despesaFormService.despesaCarregada.data));
            this.descricao = this.despesaFormService.despesaCarregada.descricao;
            this.nome = this.despesaFormService.despesaCarregada.nome;
    }
    });
}

  onFechar(){
    this.despesaFormService.closeForm();
  }

  onSubmit(){
    if(this.Despesaform.form.valid){
      if (this.isEdit()){
        const despesa: editarDespesaDto = {
          Valor: this.Despesaform.value.valor,
          Data: this.Despesaform.value.data,
          Descricao: this.Despesaform.value.descricao,
          Nome: this.Despesaform.value.nome,
        }
        this.despesaService.EditarDespesa(this.despesaFormService.despesaCarregada?.id!, despesa).subscribe();
      }
      else {
        const despesa: criarDespesaDto = {
          Valor: this.Despesaform.value.valor,
          Data: this.Despesaform.value.data,
          Descricao: this.Despesaform.value.descricao,
          Nome: this.Despesaform.value.nome,
          Usuario_Id: this.authService.idUsuario
        };

        this.despesaService.CriarDespesa(despesa).subscribe();
      }

      this.Despesaform.form.reset();
      this.onFechar();
      return;
    }
  }

  private converteData(data: Date): string{
    var year = data.getFullYear();
    var month = data.getUTCMonth() + 1;
    var day = data.getDate();

    var monthString = month.toString().padStart(2, "0")
    var dayString = day.toString().padStart(2, "0")

    return `${year}-${monthString}-${dayString}`;
  }
}

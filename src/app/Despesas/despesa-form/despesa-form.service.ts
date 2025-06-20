import { Injectable, signal } from "@angular/core";
import { despesa } from "../Despesas/Models/despesa.model";

@Injectable({providedIn: "root"})
export class FormDespesaService{
    despesaCarregada?: despesa;
    isEdit = signal<boolean>(false);
    isFormOpen = signal<boolean>(false);

    openForm(){
        this.isFormOpen.set(true);
    }

    openEditForm(desp: despesa){
        this.despesaCarregada = desp;
        this.isEdit.set(true);
        this.openForm();
    }

    closeForm(){
        this.despesaCarregada = undefined;
        this.isEdit.set(false);
        this.isFormOpen.set(false);
    }
}
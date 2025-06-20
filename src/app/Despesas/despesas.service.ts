import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { despesa } from "./Models/despesa.model";
import { tap } from "rxjs";
import { DespesasDto } from "./Models/DTOs/despesas.dto";
import { criarDespesaDto } from "./Models/DTOs/criarDespesa.dto";
import { editarDespesaDto } from "./Models/DTOs/editarDespesa.dto";
import { AuthenticationService } from "../Autentication/Authentication.service";

@Injectable({providedIn: "root"})
export class DespesasService{
    private despesas = signal<despesa[]>([]);
    private httpClient = inject(HttpClient);
    private authService = inject(AuthenticationService);

    public despesasUsuario = this.despesas.asReadonly();

    CarregarDespesas(){
        return this.httpClient
            .get<DespesasDto>(`https://localhost:7039/Despesas/BuscarPorUsuario/${this.authService.idUsuario}`)
            .pipe(tap({
                next: (desp) => {
                    this.despesas.set(desp.data)
                }
            }));
    }

    ExcluirDespesa(id: number){
        return this.httpClient
            .delete("https://localhost:7039/Despesas/" + id)
            .pipe(tap({
                next: () => {
                    this.despesas.set(this.despesas().filter(d => d.id != id))
                }
            }))
    }

    CriarDespesa(despesa: criarDespesaDto){
        return this.httpClient
            .post("https://localhost:7039/Despesas/", despesa)
            .pipe(tap({
                next: () => {
                    this.CarregarDespesas().subscribe();
                }
            }))
    }

    EditarDespesa(id: number,despesa: editarDespesaDto){
        return this.httpClient
            .put("https://localhost:7039/Despesas/" + id, despesa)
            .pipe(tap({
                next: () => {
                    this.CarregarDespesas().subscribe();
                }
            }))
    }
}
import { HttpClient } from "@angular/common/http";
import { inject, Injectable, Signal, signal } from "@angular/core";
import { AuthenticationService } from "../authentication/Authentication.service";
import { tap } from "rxjs";
import { resumo } from "./Models/resumo.model";
import { ResumoDto } from "./Models/DTO/resumo.dto";

@Injectable({providedIn: "root"})
export class ResumoService{
    private resumo = signal<resumo>(null);
    private httpClient = inject(HttpClient);
    private authService = inject(AuthenticationService);

    public resumoUsuario = this.resumo.asReadonly();

    carregarResumo(){
        return this.httpClient
        .get<ResumoDto>(`https://localhost:7039/Despesas/ResumoDeGastos/${this.authService.idUsuario}`)
        .pipe(
            tap({
                next: (res) => {
                    this.resumo.set(res.data);
                }
            })
        )
    }
}
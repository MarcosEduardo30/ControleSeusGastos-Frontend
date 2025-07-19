import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal } from "@angular/core";
import { AuthenticationService } from "../authentication/Authentication.service";
import { tap } from "rxjs";
import { resumo } from "./Models/resumo.model";

@Injectable({providedIn: "root"})
export class ResumoService{
    private resumo = signal<resumo>(null);
    private httpClient = inject(HttpClient);
    private authService = inject(AuthenticationService);

    public resumoUsuario = this.resumo.asReadonly();

    carregarResumo(){
        return this.httpClient
        .get<resumo>(`https://localhost:7039/ResumoDeGastos/${this.authService.idUsuario}`)
        .pipe(
            tap({
                next: (res) => {
                    this.resumo.set(res);
                }
            })
        )
    }
}
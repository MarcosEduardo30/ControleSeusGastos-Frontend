import { HttpClient } from "@angular/common/http";
import { DestroyRef, inject, Injectable } from "@angular/core";
import { loginInput } from "./models/loginInput";
import { user } from "./models/user"; 
import {ReplaySubject, tap } from "rxjs";
import { Router } from "@angular/router";
import { signupInput } from "./models/signupInput";

@Injectable({providedIn: "root"})
export class AuthenticationService{
    usuario = new ReplaySubject<user>();
    idUsuario: number;
    private httpClient = inject(HttpClient);
    private router = inject(Router);
    private destroyRef = inject(DestroyRef)

    constructor(){
        var sub = this.usuario.subscribe(user => this.idUsuario = user.Id)
        this.destroyRef.onDestroy(() => {sub.unsubscribe()});
    }

    login(loginInput: loginInput){
        return this.httpClient
            .post<{"token": "", "usuarioId": number, "refreshToken": ""}>("https://localhost:7039/Usuarios/Login", loginInput)
            .pipe(
                tap({
                    next: (response) => {
                        debugger;
                        const usuario = new user(response.token, response.usuarioId);
                        localStorage.setItem('jwtToken', response.token)
                        localStorage.setItem('UserId', response.usuarioId.toString())
                        localStorage.setItem('RefreshToken', response.refreshToken)
                        this.usuario.next(usuario);
                }
            }));
    }

    refreshToken(){
        const refreshToken = this.getRefreshToken();
        return this.httpClient
            .post<{"token": "", "usuarioId": number, "refreshToken": ""}>(`https://localhost:7039/Usuarios/LoginRefreshToken/${refreshToken}`, null)
            .pipe(
                tap({
                    next: (response) => {
                        const usuario = new user(response.token, response.usuarioId);
                        localStorage.setItem('jwtToken', response.token)
                        localStorage.setItem('UserId', response.usuarioId.toString())
                        localStorage.setItem('RefreshToken', response.refreshToken)
                        this.usuario.next(usuario);
                    }
                })
            )
    }

    autoLogin(){
        var token = this.getAuthToken();
        var userId = localStorage.getItem('UserId');
        if (token != null && userId != null){
            const usuario = new user(token, Number(userId));
            this.usuario.next(usuario);
            this.router.navigate(["/Despesas"]);
        }
    }

    signup(signupInput: signupInput){
        return this.httpClient
            .post("https://localhost:7039/Usuarios/", signupInput)
    }
    
    logout(){
        this.usuario.next(null);
        localStorage.removeItem('jwtToken');
        localStorage.removeItem('UserId');
        localStorage.removeItem('RefreshToken');
        this.router.navigate(["/Login"]);
    }

    getAuthToken(){
        return localStorage.getItem('jwtToken')
    }

    getRefreshToken(){
        return localStorage.getItem('RefreshToken')
    }
}
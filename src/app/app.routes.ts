import { CanMatchFn, RedirectCommand, Router, Routes } from '@angular/router';
import { LoginComponent } from './Autentication/login/login.component';
import { inject } from '@angular/core';
import { ListaDespesasComponent } from './Despesas/Lista-Despesas/lista-despesas.component';


const isAuthenticatedCanMatch: CanMatchFn = (route, segments) => {
    const router = inject(Router);
    const token = localStorage.getItem("jwtToken");
    const userId = localStorage.getItem("UserId");
    if(token != null && userId != null){
        return true;
    }
    return new RedirectCommand(router.parseUrl("/Login"));
    
}

export const routes: Routes = [
    {
        path: "Login", component: LoginComponent
    },
    {
        path: "Despesas", component: ListaDespesasComponent, canMatch: [isAuthenticatedCanMatch]
    },
    {
        path: "", redirectTo: 'Login', pathMatch: 'prefix'
    }
];

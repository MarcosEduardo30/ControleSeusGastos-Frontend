import { CanMatchFn, RedirectCommand, Router, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { inject } from '@angular/core';
import { ListaDespesasComponent } from './despesas/lista-despesas/lista-despesas.component';
import { RegisterComponent } from './authentication/signup/signup.component';
import { ResumoComponent } from './resumo/resumo.component';


const isAuthenticatedCanMatch: CanMatchFn = (route, segments) => {
    const router = inject(Router);
    const token = localStorage.getItem("jwtToken");
    const userId = localStorage.getItem("UserId");
    if(token != null && userId != null){
        return true;
    }
    return new RedirectCommand(router.parseUrl("/login"));
}

const isNotAuthenticatedCanMatch: CanMatchFn = (route, segments) => {
    const router = inject(Router);
    const token = localStorage.getItem("jwtToken");
    const userId = localStorage.getItem("UserId");
    if(token == null || userId == null){
        return true;
    }
    return new RedirectCommand(router.parseUrl("/despesas"));
}

export const routes: Routes = [
    {
        path: "login", component: LoginComponent, canMatch: [isNotAuthenticatedCanMatch]
    },
    {
        path:"signup", component: RegisterComponent, canMatch: [isNotAuthenticatedCanMatch]
    },
    {
        path: "despesas", component: ListaDespesasComponent, canMatch: [isAuthenticatedCanMatch]
    },
    {
        path: "resumo", component: ResumoComponent, canMatch: [isAuthenticatedCanMatch]
    },
    {
        path: "", redirectTo: 'login', pathMatch: 'prefix'
    },
    {
        path: "**", redirectTo: 'login'
    }
];

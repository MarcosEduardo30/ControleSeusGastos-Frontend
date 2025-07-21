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

export const routes: Routes = [
    {
        path: "login", component: LoginComponent
    },
    {
        path:"signup", component: RegisterComponent
    },
    {
        path: "despesas", component: ListaDespesasComponent, canMatch: [isAuthenticatedCanMatch]
    },
    {
        path: "resumo", component: ResumoComponent, canMatch: [isAuthenticatedCanMatch]
    },
    {
        path: "", redirectTo: 'login', pathMatch: 'prefix'
    }
];

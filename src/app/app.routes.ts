import { CanMatchFn, RedirectCommand, Router, Routes } from '@angular/router';
import { LoginComponent } from './authentication/login/login.component';
import { inject } from '@angular/core';
import { ListaDespesasComponent } from './despesas/lista-despesas/lista-despesas.component';
import { RegisterComponent } from './authentication/signup/signup.component';


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
        path:"Signup", component: RegisterComponent
    },
    {
        path: "Despesas", component: ListaDespesasComponent, canMatch: [isAuthenticatedCanMatch]
    },
    {
        path: "", redirectTo: 'Login', pathMatch: 'prefix'
    }
];

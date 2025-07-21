import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from '../../shared/loading-spinner/spinner.component';
import { Router } from '@angular/router';
import { AuthenticationService } from '../Authentication.service';
import { signupInput } from '../models/signupInput';

@Component({
  selector: 'app-register',
  imports: [FormsModule, SpinnerComponent],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class RegisterComponent {
  registerObj: signupInput = {name: "", email: "",username: "", password: ""};

  http = inject(HttpClient);
  router = inject(Router);
  authenticationService = inject(AuthenticationService);

  isLoading = false;
  errorMessage: string | null = null;

  onSubmit(){
    this.isLoading = true;
    this.errorMessage = null;
    this.authenticationService.signup(this.registerObj)
    .subscribe(({
        next: () => {
          this.isLoading = false;
          this.router.navigate(["/login"]);
          //Adicionar depois uma notificação de sucesso
        },
        error: (error: HttpErrorResponse) => {
          this.errorMessage = error.error.erros[0].mensagem;
          this.isLoading = false;
      }}))
  }
}

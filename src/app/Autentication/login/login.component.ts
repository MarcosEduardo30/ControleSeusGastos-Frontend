import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from '../../Shared/Loading-spinner/spinner.component';
import { Router } from '@angular/router';
import { loginInput } from '../models/loginInput';
import { AuthenticationService } from '../Authentication.service';

@Component({
  selector: 'app-login',
  imports: [FormsModule, SpinnerComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginObj: loginInput = {username: "", password: ""};

  http = inject(HttpClient);
  router = inject(Router);
  authenticationService = inject(AuthenticationService);

  isLoading = false;
  errorMessage: string | null = null;

  onSubmit(){
    this.isLoading = true;
    this.errorMessage = null;
    this.authenticationService.login(this.loginObj)
    .subscribe(({
        next: () => {
          this.isLoading = false;
          this.router.navigate(["/Despesas"]);
        },
        error: (error: any) => {
          this.errorMessage = error.message;
          this.isLoading = false;
      }}))
  }
}

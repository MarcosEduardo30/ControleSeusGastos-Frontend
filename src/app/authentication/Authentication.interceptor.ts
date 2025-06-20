import { HttpErrorResponse, HttpEvent, HttpHandler,
         HttpInterceptor, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { AuthenticationService } from './Authentication.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  authService = inject(AuthenticationService);
  router = inject(Router);
  
  intercept(req: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>>
  {
    const token = this.authService.getAuthToken();

    const clonedRequest = req.clone({ setHeaders : { Authorization: 'Bearer ' + token }});

    return handler
      .handle(clonedRequest)
      .pipe(
        catchError(x => { return this.HandleError(x, req, handler) })
      );
  }

  private HandleError(
    error: HttpErrorResponse, 
    req: HttpRequest<any>, 
    next: HttpHandler)
  {
    if (error && error.status == 401)
    {
      return this.authService
        .refreshToken()
          .pipe(
            switchMap((x: any) => 
            {
              const token = this.authService.getAuthToken();
              const clonedRequest = req
                .clone({ setHeaders:{ Authorization: 'Bearer ' + token} });
              return next.handle(clonedRequest);
            }),
            catchError(()=>
              {
                return throwError(()=>{ 
                  this.authService.logout();
                  this.router.navigate(["/Login"]);
                })
              })
          )
    }
    return throwError(() => new Error("?"));
  }
}
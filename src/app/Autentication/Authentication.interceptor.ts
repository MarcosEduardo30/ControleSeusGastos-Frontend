import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject, runInInjectionContext } from '@angular/core';
import { catchError, Observable, of, switchMap, throwError } from 'rxjs';
import { AuthenticationService } from './Authentication.service';
import { Router } from '@angular/router';

export const customInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('jwtToken')
  const clonedRequest = req.clone({
    setHeaders:{
      Authorization: 'Bearer ' + token
    }}
  );

  
  const authService = inject(AuthenticationService);
  const router = inject(Router);
  return next(clonedRequest)
  .pipe(
    catchError(x => 
      {
        
        return HandleError(x, req, next, authService, router)
      }));
};


export function HandleError(
  error: HttpErrorResponse, 
  req: HttpRequest<any>, 
  next: HttpHandlerFn,
  authService: AuthenticationService,
  router: Router
)
{
  if (error && error.status == 401){
    return authService.refreshToken().pipe(
      switchMap((x: any) => 
      {
          const token = localStorage.getItem('jwtToken')
          const clonedRequest = req.clone({
              setHeaders:{
                    Authorization: 'Bearer ' + token
              }
            });
        return next(clonedRequest);
      }),
      catchError(()=>
      {
        return throwError(()=>{
          router.navigate(["/Login"])
        })
      })
    )
  }
  return throwError(() => new Error("?"));
}
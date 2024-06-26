import { Injectable, inject } from '@angular/core';
import { HttpEvent, HttpInterceptorFn, HttpRequest, HttpHandlerFn, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { SweetService } from '../services/sweet.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const router = inject(Router);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if(!error.url?.includes('www.googleapis.com')){
        const sweet: SweetService = new SweetService();
      sweet.showError(error.message)
      }
      
      if (error.status === 401) {
        // Borrar la cache de localStorage
        localStorage.clear();
        // Redirigir al login
        router.navigate(['/app/login']);
        console.log('ERROR PETICION',error)
      }
      return throwError(() => error);
    })
  );
};

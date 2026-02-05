import { Injectable } from '@angular/core';
import {
  HttpInterceptorFn,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
 } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Auth } from '../services/auth'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: Auth) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    const token = this.authService.getToken();

    if (!token) {
      return next.handle(req);
    }

    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    })

    return next.handle(authReq)
  }
}
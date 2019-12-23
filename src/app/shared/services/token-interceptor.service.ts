import { Injectable, Injector } from '@angular/core'
import { HttpEvent, HttpRequest, HttpInterceptor, HttpHandler } from '@angular/common/http'
import { Observable } from 'rxjs'
import { AuthService } from './auth.service'

@Injectable({
    providedIn: 'root'
})

export class TokenInterceptorService implements HttpInterceptor {

    constructor(private injector: Injector) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authService = this.injector.get(AuthService)
        let token = authService.getToken();
        let tokenizedReq = req.clone(
            {
                headers: req.headers.set('Authorization', 'bearer ' + token),
                withCredentials: true
            }
        )
        return next.handle(tokenizedReq)
    }
}
    
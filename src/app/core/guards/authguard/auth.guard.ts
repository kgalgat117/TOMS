import { Injectable, Inject } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './../../../shared/shared.module';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private _authService: AuthService, private _router: Router, ) { }
    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        var flag;
        await this._authService.loggedIn().then(resp => {
            flag = resp
        }, err => {
            console.log(err)
        });
        if (flag.status) {
            if (route.routeConfig.path == 'home' && flag.user.role != 'tenent') {
                this._router.navigate(['/dashboard']);
            }
            if (route.routeConfig.path == 'dashboard' && flag.user.role != 'owner') {
                this._router.navigate(['/home']);
            }
            return true
        } else {
            this._router.navigate(['/login'], { queryParams: { from: state.url } });
            return false
        }
    }
}


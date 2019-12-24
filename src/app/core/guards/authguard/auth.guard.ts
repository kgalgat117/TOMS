import { Injectable, Inject } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './../../../shared/shared.module';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    ownerModules: Array<string> = [
        'dashboard'
    ]

    constructor(private _authService: AuthService, private _router: Router, ) { }
    
    async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        var flag;
        await this._authService.loggedIn().then(resp => {
            flag = resp
        }, err => {
            console.log(err)
        });
        console.log('111')
        if (flag.status) {
            console.log(route.routeConfig.path, 'check this')
            if (route.routeConfig.path == 'home' && flag.user.role != 'tenent') {
                this._router.navigate(['/dashboard']);
            }
            if ((this.ownerModules.indexOf(route.routeConfig.path) != -1) && flag.user.role != 'owner') {
                this._router.navigate(['/home']);
            }
            return true
        } else {
            this._router.navigate(['/login'], { queryParams: { from: state.url } });
            return false
        }
    }
}


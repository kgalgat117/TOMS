import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { CookieService } from 'ngx-cookie-service';
import { Secret } from './variable'
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private _userInfoApi = this.secret.DOMAIN_NAME + "user";

    constructor(private router: Router, private http: HttpClient, private secret: Secret, private cookieService: CookieService) { }

    logoutUser() {
        this.cookieService.delete('UID', '/', 'localhost')
        this.router.navigate(['/login'])
    }

    getToken() {
        var token = ''
        if (token == undefined || token == '') {
            token = this.cookieService.get('UID')
        }
        return token
    }

    async loggedIn() {
        var token;
        var flag: any = {};
        flag.status = false;
        token = this.cookieService.get('UID');
        if (token == undefined || token == '') {
            flag.status = false;
            return flag;
        } else {
            await this.http.get(this._userInfoApi + '/guard').toPromise().then(response => {
                flag = response;
            }).catch(this.handleError);
            return flag
        }
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    }
}

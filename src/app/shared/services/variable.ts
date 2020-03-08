import { Injectable } from '@angular/core';
import { environment } from './../../../environments/environment'

@Injectable({
    providedIn: 'root'
})

export class Secret {

    DOMAIN_NAME = environment.DOMAIN_NAME
    HOST = environment.HOST

    constructor() {
        console.log(this.DOMAIN_NAME, this.HOST)
    }

}
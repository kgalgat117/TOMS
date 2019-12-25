import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { CookieService } from 'ngx-cookie-service';

import { AuthService } from './services/auth.service';
import { TokenInterceptorService } from './services/token-interceptor.service';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
    declarations: [
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgbModule
    ],
    providers: [
        CookieService,
        AuthService,
        {
            provide: HTTP_INTERCEPTORS,
            useExisting: TokenInterceptorService,
            multi: true
        }
    ],
    exports: [
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NgbModule
    ]

})
export class SharedModule { }


export * from './services/variable';
export * from './services/auth.service'
export * from './interfaces/property'
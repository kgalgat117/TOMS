import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/shared.module';


@Component({
    selector: 'owner-home',
    templateUrl: './owner.component.html',
    styleUrls: ['./owner.component.css']
})

export class OwnerComponent implements OnInit {

    constructor(private authService: AuthService) { }

    signOut() {
        this.authService.logoutUser()
    }

    ngOnInit() { }
} 
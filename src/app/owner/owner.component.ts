import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/shared.module';
declare var $: any;

@Component({
    selector: 'owner-home',
    templateUrl: './owner.component.html',
    styleUrls: ['./owner.component.css']
})

export class OwnerComponent implements OnInit {

    constructor(private authService: AuthService) { }

    toggle() {
        $("body").toggleClass("sidebar-toggled");
        $(".sidebar").toggleClass("toggled");
        if ($(".sidebar").hasClass("toggled")) {
            $('.sidebar .collapse').collapse('hide');
        };
    }

    logout(){
        this.authService.logoutUser()
    }

    signOut() {
        this.authService.logoutUser()
    }

    ngOnInit() { }
} 
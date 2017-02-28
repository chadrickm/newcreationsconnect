import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Auth, User, IDetailedError } from '@ionic/cloud-angular';

import { RegisteredUser } from '../../_models/RegisteredUser';

@Component({
    selector: 'register-page',
    templateUrl: 'register.html'
})
export class Register implements OnInit {

    registeredUser: RegisteredUser;
    isAuthenticated: boolean;

    constructor(public auth: Auth, public user: User, private navController: NavController) { }

    ngOnInit() {
        this.isAuthenticated = this.auth.isAuthenticated();
        this.registeredUser = new RegisteredUser();
    }

    register() {
        this.auth.signup(this.registeredUser).then(results => { },
            (err: IDetailedError<string[]>) => {
                for (let e of err.details) {
                    if (e === 'conflict_email') {
                        alert('Email already exists.');
                    } else {
                        // handle other errors
                    }
                }
            }
        );
    }

    login() {
        this.auth.login('basic', this.registeredUser).then(results => {
            console.log(this.user);
        });
    }

    logout() {
        this.auth.logout();
        this.navController.pop()
    }
}
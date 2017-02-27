import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';

import { RegisteredUser } from '../../_models/RegisteredUser';

@Component({
  selector: 'login-page',
  templateUrl: 'login.html'
})
export class Login implements OnInit {

  newUser: RegisteredUser;
  loginResults: any;
  authResults: any;

  constructor(public auth: Auth, public user: User) { }

  ngOnInit() {
    this.newUser = new RegisteredUser();
    console.log(this.user);
    console.log(this.auth.isAuthenticated());
  }

  register() {
    this.auth.signup(this.newUser).then(results => {
      this.loginResults = results;
      console.log(this.user);
      console.log(this.loginResults);
    },
      (err: IDetailedError<string[]>) => {
        for (let e of err.details) {
          if (e === 'conflict_email') {
            alert('Email already exists.');
          } else {
            // handle other errors
          }
        }
      });
  }

  login() {
    this.auth.login('basic', this.newUser).then(results => {
      this.authResults = results;
      console.log(this.user);
      console.log(this.auth.isAuthenticated());
    });
  }

  logout() {
    this.auth.logout();
    console.log(this.user);
    console.log(this.auth.isAuthenticated());
  }

}

import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Auth, User } from '@ionic/cloud-angular';

import { LoginCriteria } from '../../_models/LoginCriteria';
import { Register } from '../../pages/register/register';

@Component({
  selector: 'login-page',
  templateUrl: 'login.html'
})
export class Login implements OnInit {

  loginCriteria: LoginCriteria;
  isAuthenticated: boolean;

  constructor(
    public auth: Auth,
    public navController: NavController,
    private navParams: NavParams,
    public user: User) { }

  ngOnInit() {
    this.isAuthenticated = this.auth.isAuthenticated();
    this.loginCriteria = new LoginCriteria();
  }

  login() {
    this.auth.login('basic', this.loginCriteria).then(results => {
      if (this.auth.isAuthenticated()){
        this.navController.pop();
      }
    });
  }

  logout() {
    this.auth.logout();
    this.isAuthenticated = this.auth.isAuthenticated();
  }

  goToRegisterPage() {
    this.navController.push(Register);
  }
}

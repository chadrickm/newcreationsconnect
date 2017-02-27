import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'home',
  templateUrl: 'home.html'
})
export class Home implements OnInit {

  constructor(public navCtrl: NavController) { }

  ngOnInit() { }

}

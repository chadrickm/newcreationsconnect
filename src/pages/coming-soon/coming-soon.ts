import { Component, OnInit } from '@angular/core';

import { NavParams } from 'ionic-angular';

@Component({
    selector: 'coming-soon',
    templateUrl: 'coming-soon.html'
})
export class ComingSoon implements OnInit {

    featureTitle: string;
    featureDescription: string;

    constructor(
        private navParams: NavParams
    ) {}

    ngOnInit() {
        this.featureTitle = this.navParams.get('featureTitle');
        this.featureDescription = this.navParams.get('featureDescription');
    }
}
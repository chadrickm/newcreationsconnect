import { Component, OnInit } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { ValidationResult } from '../../../../_services/_common/validation';

@Component({
    selector: 'validation-results',
    templateUrl: './validation-results.component.html'
})
export class ValidationResults implements OnInit {

    validationResult: ValidationResult;

    constructor(
        private navParams: NavParams,
        private viewController: ViewController
        //private _validationResult: ValidationResult
    ) {
        this.validationResult = new ValidationResult();
        this.validationResult.messages = this.navParams.get('messages');
    }

    ngOnInit() {
    }

    dismiss() {
        this.viewController.dismiss();
    }
}
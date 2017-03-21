import { Component } from '@angular/core';
import { Deploy } from "@ionic/cloud-angular";
import { ToastController } from "ionic-angular";

@Component({
    selector: 'check-for-updates',
    templateUrl: 'check-for-updates.html'
})
export class CheckForUpdates {

    constructor(
        private readonly deploy: Deploy,
        //private readonly loadingCtrl: LoadingController,
        private readonly toastCtrl: ToastController
    ) { }

    checkForUpdate() {
        // const checking = this.loadingCtrl.create({
        //     content: 'Checking for update...'
        // });
        // checking.present();

        this.deploy.check().then((snapshotAvailable: boolean) => {
            //checking.dismiss();
            if (snapshotAvailable) {
                this.downloadAndInstall();
            }
            else {
                const toast = this.toastCtrl.create({
                    message: 'No update available',
                    duration: 3000
                });
                toast.present();
            }
        });
    }

    private downloadAndInstall() {
        // const updating = this.loadingCtrl.create({
        //     content: 'Updating application...'
        // });
        // updating.present();
        this.deploy.download().then(() => this.deploy.extract()).then(() => this.deploy.load());
    }
}
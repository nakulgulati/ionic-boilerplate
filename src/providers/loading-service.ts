import { Injectable } from '@angular/core';
import {
  LoadingController,
  Loading,
  LoadingOptions
} from 'ionic-angular';

@Injectable()
export class LoadingService {
  instance: Loading;
  defaultOptions: LoadingOptions;
  isActive: boolean;

  constructor(public loadingCtrl: LoadingController) {
    this.defaultOptions = {
      dismissOnPageChange: true
    };
    this.isActive = false;
  }

  show(options?: LoadingOptions) {
    options = options || {};
    options = Object.assign(this.defaultOptions, options);

    if (!this.isActive) {
      this.instance = this.loadingCtrl.create(options);

      this.instance.onDidDismiss(() => {
        this.isActive = false;
      });

      this.instance.present().then(() => {
        this.isActive = true;
      });
    }

  }

  hide() {
    if (this.isActive) {
      this.instance.dismiss();
    }
  }
}

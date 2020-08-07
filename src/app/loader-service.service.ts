import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular'

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  loader: HTMLIonLoadingElement;

    constructor(public loadingController: LoadingController) {
    }

    async presentLoading(msg: string) {
      const loading = await this.loadingController.create({
        cssClass: 'my-custom-class',
        message: msg,
        duration: 3000
      });
      await loading.present();
  
      const { role, data } = await loading.onDidDismiss();
      console.log('Loading dismissed!');
    }

  }

import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/compat/database';
import { Ferienort } from "../_types/ferienort";

@Component({
  selector: 'app-ferienorte',
  templateUrl: './ferienorte.page.html',
  styleUrls: ['./ferienorte.page.scss'],
})
export class FerienortePage implements OnInit {

  groupNumber: string =  'G2'; // Bsp. G1
  orteList: Observable<Ort[]>;
  orteListRef: AngularFireList<Ort>;


  constructor(public alertCtrl: AlertController,afDb: AngularFireDatabase) {
    this.orteListRef = afDb.list('/ferienorte/' + this.groupNumber);
    this.orteList = this.orteListRef.valueChanges();
  }

  ngOnInit() {
  }

  async addFerienort() {
    const alert = await this.alertCtrl.create({
      message: 'Ferienort hinzufügen',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Ferienort'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        }, {
          text: 'Ok',
          role: 'ok',
        }
      ]
    });

    await alert.present();

    const response = await alert.onDidDismiss();
    if(response.role === 'ok' && response.data.values.name !== '') {
      this.orteListRef.push({name: response.data.values.name});
    }
  }
}

interface Ort {
  name: string;
}

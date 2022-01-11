import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../_types/user';
import { NavController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth, private navCtrl: NavController, private toast: ToastController, private router:  Router) { }

  async loginWithEmailAndPassword (user: User, redirectToURL?: string) {
    return this.afAuth.signInWithEmailAndPassword(user.email, user.password)
    .then((result) => {
      this.router.navigate(['/' + redirectToURL]);
    }).catch((error) => {
      this.presentToast(error.message);
    });
  }

  async createUserWithEmailAndPassword (user: User, redirectToURL?: string) {
    return this.afAuth.createUserWithEmailAndPassword(user.email, user.password)
    .then((result) => {
      window.alert('You have been successfully registered!');
      this.router.navigate(['/' + redirectToURL]);
    }).catch((error) => {
      this.presentToast(error.message);
    });
  }
  // Returns true if user is logged in
  get authenticated(): boolean {
    return this.afAuth.currentUser !== null;
  }
  
  logout() {
    this.afAuth.signOut()
    .then((result) => {
      this.router.navigate(['/login']);
      console.log('logged out');
    }).catch((error) => {
      this.presentToast(error.message);
    });
  }

  async presentToast(text: string) {
    const toast = await this.toast.create({
      message: ''+ text,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }
}

import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { User } from '../_types/user';
import {Router} from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-registrierung',
  templateUrl: './registrierung.page.html',
  styleUrls: ['./registrierung.page.scss'],
})
export class RegistrierungPage implements OnInit {

  user = {email: '', password : '', displayname: ''};

  constructor(private router: Router,
    private alertCtrl: AlertController,
    private toast: ToastController,
    private authService: AuthService
   ) {
  }

  ngOnInit() {
  }

  async register () {
    if(this.user.email !== '' && this.user.password !== '' && this.user.displayname !== '') {
      this.authService.createUserWithEmailAndPassword(this.user, 'login');
    }
  }

  goBackToLogin() {
    this.router.navigate(['/login']);
  }
}

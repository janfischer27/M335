import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { User } from '../_types/user';
import { Router } from '@angular/router';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  user: User = {email: '', password : '', displayname: ''};

  constructor(
    private alertCtrl: AlertController,
    private router: Router,
    private authService: AuthService
  ) {

  }
  ngOnInit() {
  }
  
  async doLogin () {
    if(this.user.email !== '' && this.user.password !== '') {
      this.authService.loginWithEmailAndPassword(this.user, 'gallerie');
    }
  }

  gotoRegistrierung () {
    this.router.navigate(['/registrierung']);
  }
}

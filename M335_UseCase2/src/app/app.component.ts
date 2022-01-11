import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  public appPages = [
    { title: 'Gallerie', url: '/gallerie', icon: 'images' },
    { title: 'Ferienorte', url: '/ferienorte', icon: 'airplane' },
  ];

  constructor(
    private platform: Platform,
    private authService: AuthService,
  ) {
    this.initializeApp();
  }

  initializeApp() {

  }

  logout() {
    this.authService.logout();
  }
}

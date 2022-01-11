import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StorageService } from '../_services/storage.service';

@Component({
  selector: 'app-willkommen',
  templateUrl: './willkommen.page.html',
  styleUrls: ['./willkommen.page.scss'],
})
export class WillkommenPage implements OnInit {

  constructor(private router: Router, private storageService: StorageService) { }

  ngOnInit() {
    this.welcomeDone();
  }

  welcomeDone() {
    this.storageService.set('WelcomeDone', true);
  }

  navigateTo(link: string) {
    this.router.navigate(['/' + link]);
  }


}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogoutComponent } from './logout/logout.page';
import { AngularFireAuthGuard, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/compat/auth-guard';
import { WillkommenGuard } from './_guards/willkommen.guard';

// TODO: Standardverhalten definieren
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);
const redirectLoggedInToRoot = () => redirectLoggedInTo(['ferienorte']);

// TODO: Willkommen Guard

// TODO: Routes schützen inkl. AuthGuard oder AngularFireAuthGuard definieren
const routes: Routes = [
  {
    path: '',
    redirectTo: 'willkommen',
    pathMatch: 'full'
  },
  {
    path: 'ferienorte',
    loadChildren: () => import('./ferienorte/ferienorte.module').then( m => m.FerienortePageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'gallerie',
    loadChildren: () => import('./gallerie/gallerie.module').then( m => m.GalleriePageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToRoot }
  },
  {
    path: 'registrierung',
    loadChildren: () => import('./registrierung/registrierung.module').then( m => m.RegistrierungPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToRoot }
  },
  {
    path: 'willkommen',
    loadChildren: () => import('./willkommen/willkommen.module').then( m => m.WillkommenPageModule),
    canLoad: [WillkommenGuard],
  },
  {
    path: 'logout',
    component: LogoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
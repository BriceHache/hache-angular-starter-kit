import { Routes, mapToCanActivate } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { PageNotFoundComponent } from './not-found.component';
import { LoginComponent } from './login/login.component';
import { Reset_PasswordComponent } from './login/reset_password';
import { DashboardComponent } from './dashboard/dashboard';
import { Requester_DashboardComponent } from './requester/dashboard/requester_dashboard';
import { Requester_ProfileComponent } from './requester/profile/requester_profile';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'reset_password/:key', component: Reset_PasswordComponent },
    { path: '', component: DashboardComponent, canActivate: [AuthGuard] },

     //requester
 { path: 'requester', component: Requester_DashboardComponent, canActivate: mapToCanActivate([AuthGuard]) },
 { path: 'requester/profile', component: Requester_ProfileComponent, data: { pageProp: 'Is_Profile_Visible_Client' }, canActivate: mapToCanActivate([AuthGuard]) },
    //Admin
   /* { path: 'admin/basic', loadChildren: () => import('./admin_setting/basic/basic.module').then(m => m.BasicModule), data: { pageProp: 'Show_Admin_Menu' }, canActivate: mapToCanActivate([AuthGuard]) },
    { path: 'admin', loadChildren: () => import('./admin_setting/user/user.module').then(m => m.UserModule), data: { pageProp: 'Show_Admin_Menu' }, canActivate: mapToCanActivate([AuthGuard]) },
    { path: 'admin/general', loadChildren: () => import('./admin_setting/general/general.module').then(m => m.GeneralModule), data: { pageProp: 'Show_Admin_Menu' }, canActivate: mapToCanActivate([AuthGuard]) },
    { path: 'admin', loadChildren: () => import('./admin_setting/branding/branding.module').then(m => m.BrandingModule), data: { pageProp: 'Show_Admin_Menu' }, canActivate: mapToCanActivate([AuthGuard]) },
    { path: 'admin/mail', loadChildren: () => import('./admin_setting/mailsetting/mailsetting.module').then(m => m.MailSettingModule), data: { pageProp: 'Show_Admin_Menu' }, canActivate: mapToCanActivate([AuthGuard]) },
       */ 
    { path: '**', component: PageNotFoundComponent }
];


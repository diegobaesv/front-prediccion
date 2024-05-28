import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { PredictionComponent } from './pages/prediction/prediction.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'principal/home'},
    { path: 'principal', component: MainLayoutComponent, children: [
        { path: 'login', component: LoginComponent},
        { path: 'home', component: HomeComponent },
        { path: 'prediction', component: PredictionComponent},
        { path: 'profile', component: ProfileComponent}
    ]}
];

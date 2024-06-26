import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { PredictionComponent } from './pages/prediction/prediction.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
import { AuthCallbackComponent } from './pages/auth-callback/auth-callback.component';
import { AuthGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: '', pathMatch: 'full', redirectTo: 'app'},
    { path: 'app', component: MainLayoutComponent, children: [
        { path: '',  pathMatch: 'full', redirectTo: 'login'},
        { path: 'login', component: LoginComponent},
        { path: 'auth-callback', component: AuthCallbackComponent},
        { path: 'home', component: HomeComponent, canActivate: [AuthGuard]  },
        { path: 'prediction', component: PredictionComponent, canActivate: [AuthGuard] },
        { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] }
    ]}
];

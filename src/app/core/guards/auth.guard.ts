import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LOCALCACHE_AUTH } from '../../shared/constants/constants';
import { LocalCacheService } from '../services/localcache.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(
        private router: Router,
        private localCacheService: LocalCacheService
    ) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const isAuthenticated = !!this.localCacheService.getItem(LOCALCACHE_AUTH)
        if (!isAuthenticated) {
            this.localCacheService.clear();
            this.router.navigate(['/app/login']);
        }
        return isAuthenticated;
    }
}

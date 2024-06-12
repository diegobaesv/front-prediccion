import { Component, Input, OnInit } from '@angular/core';
import { LocalCacheService } from '../../../core/services/localcache.service';
import { LOCALCACHE_AUTH, LOCALCACHE_USERINFO } from '../../constants/constants';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule,ButtonModule, MenuModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

    constructor(
        private localcacheService: LocalCacheService,
        private router: Router
    ) {
    }

    @Input() showHome: boolean =true;
    @Input() showUser: boolean =true;

    userInfo:any;
    itemsMenu: MenuItem[] = [
        {
            label: 'Perfil',
            icon: 'pi pi-user',
            routerLink:'/app/profile'
        },
        {
            label: 'Cerrar Sesión',
            icon: 'pi pi-sign-out',
            routerLink:'/app/login'
        }
    ];

    
    ngOnInit(): void {
        this.userInfo = this.localcacheService.getItem(LOCALCACHE_USERINFO);
        console.log(this.userInfo);
    }

    onClickHome(){
        this.router.navigate(['app/home'])
    }

}

import { Component, OnInit } from '@angular/core';
import { LocalCacheService } from '../../../core/services/localcache.service';
import { LOCALCACHE_AUTH, LOCALCACHE_USERINFO } from '../../constants/constants';
import { ButtonModule } from 'primeng/button';
import { Router } from '@angular/router';


@Component({
    selector: 'app-header',
    standalone: true,
    imports: [ButtonModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

    constructor(
        private localcacheService: LocalCacheService,
        private router: Router
    ) {
    }

    userInfo:any;
    
    ngOnInit(): void {
        this.userInfo = this.localcacheService.getItem(LOCALCACHE_USERINFO);
        console.log(this.userInfo);
    }

    onClickHome(){
        this.router.navigate(['app/home'])
    }

}

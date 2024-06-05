import { Component, OnInit } from '@angular/core';
import { LocalCacheService } from '../../../core/services/localcache.service';
import { LOCALCACHE_AUTH, LOCALCACHE_USERINFO } from '../../constants/constants';


@Component({
    selector: 'app-header',
    standalone: true,
    imports: [],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

    constructor(
        private localcacheService: LocalCacheService
    ) {
    }

    userInfo:any;
    
    ngOnInit(): void {
        this.userInfo = this.localcacheService.getItem(LOCALCACHE_USERINFO);
        console.log(this.userInfo);
    }

}

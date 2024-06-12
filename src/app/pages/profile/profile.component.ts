import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { LocalCacheService } from '../../core/services/localcache.service';
import { LOCALCACHE_USERINFO } from '../../shared/constants/constants';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule} from 'primeng/inputtext';
import { InputNumberModule} from 'primeng/inputnumber';

import { InputSwitchModule } from 'primeng/inputswitch';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule,HeaderComponent,InputMaskModule,InputTextModule,InputSwitchModule, ButtonModule,InputNumberModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

  constructor(
    private localcacheService: LocalCacheService,
  ){

  }

  userInfo:any;

  fechaNacimiento: string='20/04/1987';
  estatura: number = 170;
  peso: number = 70;
  googleFit: boolean = true;


  ngOnInit(): void {
    this.userInfo = this.localcacheService.getItem(LOCALCACHE_USERINFO);
    console.log(this.userInfo);
  }

}

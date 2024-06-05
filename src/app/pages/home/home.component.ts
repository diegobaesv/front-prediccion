import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { GoogleApiService } from '../../core/services/googleapi.service';
import { LocalCacheService } from '../../core/services/localcache.service';
import { LOCALCACHE_AUTH } from '../../shared/constants/constants';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  constructor(
    private router:Router,
    private googleApiService: GoogleApiService,
    private localCacheService: LocalCacheService
  ){
  }

  auth: any;

  ngOnInit(): void {
    this.auth = this.localCacheService.getItem(LOCALCACHE_AUTH);
  }

  

  onClickNuevaPrediccion(){
    this.router.navigate(['/app/prediction'])
  }

  async onClickSincronizar(){
    const fitness = await this.googleApiService.getFitnessData(this.auth.access_token);
    console.log(fitness);
  }
}

import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../core/services/auth.service';
import { LocalCacheService } from '../../core/services/localcache.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{

  constructor(
    private authService: AuthService,
    private localCacheService: LocalCacheService
  ){}


  ngOnInit(): void {
    this.localCacheService.clear();
  }

  
  getPathGoogleAuth():string{
    return this.authService.getPathGoogleAuth();
  }

}

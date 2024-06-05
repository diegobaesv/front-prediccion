import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(
    private authService: AuthService
  ){}

  
  getPathGoogleAuth():string{
    return this.authService.getPathGoogleAuth();
  }

}

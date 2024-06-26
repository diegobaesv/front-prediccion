import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../core/services/auth.service';
import { LocalCacheService } from '../../core/services/localcache.service';
import { StepsModule } from 'primeng/steps';
import { MenuItem } from 'primeng/api';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { UsuariosGoogleService } from '../../core/services/usuariosGoogle.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ButtonModule, StepsModule,InputTextModule,FloatLabelModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  itemsStep: MenuItem[] = [
    {
      label: 'Crear Cuenta',
      routerLink: ''
    },
    {
      label: 'Vincular Google',
      routerLink: ''
    }
  ];;

  activeIndex = 0;
  correoStatus = -1;

  constructor(
    private authService: AuthService,
    private usuariosGoogleService: UsuariosGoogleService,
    private localCacheService: LocalCacheService
  ) { }


  ngOnInit(): void {
    this.localCacheService.clear();
  }


  openPathGoogleAuth() {
    window.open(this.authService.getPathGoogleAuth(),'_self');
  }

  onClickToStep(index: number){
    this.correoStatus = -1;
    this.activeIndex = index;
  }

  async onEventCorreo(event: any){
    const email:string = event.target.value;

    if(!email.endsWith('@gmail.com')){
      this.correoStatus = 2;
      return;
    }

    const resp: any = await this.usuariosGoogleService.findByEmail(email);
    console.log('onEventCorreo',resp);
    if(resp){
      this.correoStatus = resp.found ? 1 : 0;
    }
  }

}

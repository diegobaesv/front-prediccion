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
import { InputMaskModule } from 'primeng/inputmask';
import { FormsModule } from '@angular/forms';
import { InputNumberModule} from 'primeng/inputnumber';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule,ButtonModule, StepsModule,InputTextModule,FloatLabelModule,InputMaskModule,InputNumberModule],
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

  email = '';
  fechaNacimiento = '';
  estatura = 0;
  peso = 0;

  errorCuenta:boolean = false;

  constructor(
    private authService: AuthService,
    private usuariosGoogleService: UsuariosGoogleService,
    private localCacheService: LocalCacheService
  ) { }


  ngOnInit(): void {
    this.localCacheService.clear();
    this.errorCuenta = false;
  }

  async onClickCrearCuenta() {
    this.errorCuenta = false;
    console.log('onClickCrearCuenta',this.fechaNacimiento,this.estatura,this.peso,this.correoStatus);
    if (this.fechaNacimiento.trim().length == 0 ||
      !this.estatura || this.estatura == 0 || 
      !this.peso || this.peso == 0 ||
      this.email.trim().length == 0 ||
     this.correoStatus != 0
    ) {
      this.errorCuenta = true;
      return;
    }

    const usuario:any = {
      email: this.email,
      fechaNacimiento: this.fechaNacimiento,
      estatura: this.estatura,
      peso: this.peso
    }

    const resp = await this.usuariosGoogleService.updateOrCreate(usuario);
    console.log('usuariosGoogleService.updateOrCreate::resp',resp);

    this.openPathGoogleAuth();

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

import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { LocalCacheService } from '../../core/services/localcache.service';
import { LOCALCACHE_USERINFO, LOCALCACHE_USUARIOGOOGLE } from '../../shared/constants/constants';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberModule } from 'primeng/inputnumber';

import { InputSwitchModule } from 'primeng/inputswitch';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { UsuariosGoogleService } from '../../core/services/usuariosGoogle.service';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SweetService } from '../../core/services/sweet.service';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, HeaderComponent, InputMaskModule, ConfirmDialogModule, InputTextModule, InputSwitchModule, ButtonModule, InputNumberModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {

  constructor(
    private localcacheService: LocalCacheService,
    private usuariosGoogleService: UsuariosGoogleService,
    private sweetService: SweetService
  ) {

  }

  usuarioGoogle: any;

  fechaNacimiento: string = '20/04/1987';
  estatura: number = 170;
  peso: number = 70;
  googleFit: boolean = true;


  ngOnInit(): void {
    this.usuarioGoogle = this.localcacheService.getItem(LOCALCACHE_USUARIOGOOGLE);
    console.log('usuarioGoogle', this.usuarioGoogle);
  }

  async onClickActualizarDatos() {
    this.sweetService.showConfirm('¿Seguro deseas guardar los cambios?',async ()=>{
      const resp = await this.usuariosGoogleService.updateOrCreate(this.usuarioGoogle);
      console.log('resp::', resp);
      this.sweetService.showSuccess()
    })
    
  }

}

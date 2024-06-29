import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../core/services/auth.service';
import { CommonModule } from '@angular/common';
import { MessagesModule } from 'primeng/messages';
import { Message } from 'primeng/api';
import { GoogleApiService } from '../../core/services/googleapi.service';
import { LocalCacheService } from '../../core/services/localcache.service';
import { LOCALCACHE_AUTH, LOCALCACHE_USERINFO, LOCALCACHE_USUARIOGOOGLE } from '../../shared/constants/constants';
import { UsuariosGoogleService } from '../../core/services/usuariosGoogle.service';


@Component({
  selector: 'app-auth-callback',
  standalone: true,
  imports: [ButtonModule, CommonModule,MessagesModule],
  templateUrl: './auth-callback.component.html',
  styleUrl: './auth-callback.component.scss'
})
export class AuthCallbackComponent {

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private googleApiService: GoogleApiService,
        private localCacheService: LocalCacheService,
        private usuariosGoogleService: UsuariosGoogleService
    ) {}

    errorMessages: Message[] = []

    ngOnInit() {

        this.route.fragment.subscribe(async fragment => {
            const params = new URLSearchParams(fragment||'');

            const error =  params.get('error');
            if(error){
               this.addErrorMessage(error);
            }

            const authObj = {
                access_token : params.get('access_token') || '',
                scope : params.get('scope'),
                token_type : params.get('token_type'),
                expires_in : params.get('expires_in'),
            }
            console.log('authObj',authObj);

            if(authObj.access_token == null){
                this.addErrorMessage('No se ha encontrado el ACCESS TOKEN');
            }

            const userInfo = await this.googleApiService.getUserInfo(authObj.access_token).catch((error)=>{
                this.addErrorMessage(error.message);
            });
            console.log('userInfo',userInfo);

            if(userInfo == undefined || userInfo == null){
                this.addErrorMessage('No se ha encontrado datos del usuario');
            }

            if(this.errorMessages.length == 0) {

                const resp :any = await this.usuariosGoogleService.updateOrCreate(userInfo);
                console.log('usuariosGoogleService::',resp);
                
                this.localCacheService.setItem(LOCALCACHE_USUARIOGOOGLE,resp);
                this.localCacheService.setItem(LOCALCACHE_AUTH,authObj);
                this.localCacheService.setItem(LOCALCACHE_USERINFO,userInfo);

                if(!resp.fechaNacimiento || !resp.peso || !resp.estatura){
                    this.router.navigate(['app/profile']);
                } else{
                    this.router.navigate(['app/home']);
                }
                
            }
          });
      }

    addErrorMessage(message: string) {
        this.errorMessages.push({
            severity: 'error',
            detail:message
        });
    }

    onClickVolverInicio(){
        this.router.navigate(['/']);
    }
  
}

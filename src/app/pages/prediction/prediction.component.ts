import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { IRegistroFinalModel } from '../../core/models/registroFinal.model';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { PredictService } from '../../core/services/predict.service';
import { SelectButtonModule } from 'primeng/selectbutton';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InputNumberModule} from 'primeng/inputnumber';
import { IPrediccion } from '../../core/models/prediccion.model';
import { LocalCacheService } from '../../core/services/localcache.service';
import { LOCALCACHE_USUARIOGOOGLE } from '../../shared/constants/constants';

@Component({
  selector: 'app-prediction',
  standalone: true,
  imports: [CommonModule,FormsModule,InputTextModule, ButtonModule, HeaderComponent,SelectButtonModule,InputNumberModule],
  templateUrl: './prediction.component.html',
  styleUrl: './prediction.component.scss'
})
export class PredictionComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private predictService: PredictService,
    private localCacheService: LocalCacheService
  ) {

  }

  presionArterialUlt?: IRegistroFinalModel;
  pasosRealizadosUlt?: IRegistroFinalModel;
  nivelSuenoUlt?: IRegistroFinalModel;
  nivelEstresUlt?: IRegistroFinalModel;

  opcionesNivel: any[] = [{ label: 'Bajo', value: 'bajo' },{ label: 'Normal', value: 'normal' },{ label: 'Alto', value: 'alto' }];
  fumarValue: string = 'off';
  beberValue: string = 'off';

  peso?: number;
  horasDormir?: number;

  predictValue?:number;

  error:string ='';

  usuarioGoogle:any;
  

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const encoded = params['data'];
      console.log('encoded', encoded);

      const values = JSON.parse(decodeURI(encoded))
      console.log('values', values);

      this.presionArterialUlt = values.presionArterial;
      this.pasosRealizadosUlt = values.pasosRealizados;
    });
    this.usuarioGoogle =  this.localCacheService.getItem(LOCALCACHE_USUARIOGOOGLE);
    this.peso = this.usuarioGoogle.peso;

  }

  async onClickPredecir(){
    this.predictValue = undefined;
    this.error = '';

    if( !this.peso) {
      this.error= 'Debe ingresar un peso';
      return;
    }

    if( !this.horasDormir) {
      this.error= 'Debe ingresar horas de sueño';
      return;
    }


    if( this.peso > 500 ) {
      this.error= 'Debe ingresar un peso correcto';
      return;
    }

    if( this.horasDormir > 24 ) {
      this.error= 'Debe ingresar un horario de sueño correcto';
      return;
    }

    if(this.getValorNivel(this.fumarValue) == 0 ) {
      this.error= 'Debe ingresar valores para fumar';
      return;
    }

    if( this.getValorNivel(this.beberValue) == 0 ) {
      this.error= 'Debe ingresar valores para beber';
      return;
    }


    const pasosRealizados = this.pasosRealizadosUlt?.value  || 0;

    let nivelPasos = 0;
    if(pasosRealizados < 3000) {
      nivelPasos=1;
    } else if(pasosRealizados >= 3000 && pasosRealizados < 6000) {
      nivelPasos=2;
    } else {
      nivelPasos=3;
    }

    const body = {
      age:this.calcularEdad(this.usuarioGoogle.fechaNacimiento),
      height: this.usuarioGoogle.estatura,
      weight: this.peso||0,
      pressure_level:this.presionArterialUlt?.value || 0,
      step_level:nivelPasos,
      rest_level: this.horasDormir, 
      smoking_consumption_level: this.getValorNivel(this.fumarValue),
      drink_consumption_level: this.getValorNivel(this.beberValue)
  }

    const  resp :any= await this.predictService.predict(body);
    console.log('resp',resp);

    console.log('this.predictService.predict',body,resp);


    const body2 = {
      inputs: body,
      output: resp,
      idUsuarioGoogle: 'test'
    }

    const resp2 = await this.predictService.guardarPrediccion(body2);
    console.log('resp2',resp2)

    if(resp.success){
      this.predictValue = resp.predict;
    }
  }

  getValorNivel(value:string):number{
    if(value=='bajo'){
      return 1;
    }
    if(value=='normal'){
      return 2;
    }
    if(value=='alto'){
      return 3;
    }
    return 0;
  }


  calcularEdad(fechaNacimiento: string): number {
    if(fechaNacimiento.length == 0){
      return 0;
    }

    const partes = fechaNacimiento.split('/');
    const dia = parseInt(partes[0], 10);
    const mes = parseInt(partes[1], 10) - 1; // Los meses en JavaScript son 0-indexados
    const anio = parseInt(partes[2], 10);

    const fechaNac = new Date(anio, mes, dia);
    const hoy = new Date();

    let edad = hoy.getFullYear() - fechaNac.getFullYear();
    const mesDiferencia = hoy.getMonth() - fechaNac.getMonth();

    if (mesDiferencia < 0 || (mesDiferencia === 0 && hoy.getDate() < fechaNac.getDate())) {
        edad--;
    }

    return edad;
}


}

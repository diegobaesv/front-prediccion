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

@Component({
  selector: 'app-prediction',
  standalone: true,
  imports: [CommonModule,FormsModule,InputTextModule, ButtonModule, HeaderComponent,SelectButtonModule],
  templateUrl: './prediction.component.html',
  styleUrl: './prediction.component.scss'
})
export class PredictionComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private predictService: PredictService
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

  predictValue?:number;

  error:string ='';
  

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const encoded = params['data'];
      console.log('encoded', encoded);

      const values = JSON.parse(decodeURI(encoded))
      console.log('values', values);

      this.presionArterialUlt = values.presionArterial;
      this.pasosRealizadosUlt = values.pasosRealizados;
    });
  }

  async onClickPredecir(){
    this.predictValue = undefined;
    this.error = '';

    if( !this.peso || this.peso <= 0 ) {
      this.error= 'Debe ingresar un peso';
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

    

    const  resp :any= await this.predictService.predict( 
      60, 
      1.78, 
      this.peso||0, 
      this.presionArterialUlt?.value || 0,
      this.pasosRealizadosUlt?.value || 0, 
      1, 
      this.getValorNivel(this.fumarValue),
      this.getValorNivel(this.beberValue)
    );
    console.log('resp',resp);


    

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


}

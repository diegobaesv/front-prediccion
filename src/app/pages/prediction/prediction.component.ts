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

  fumarOpciones: any[] = [{ label: 'Bajo', value: 'bajo' },{ label: 'Normal', value: 'normal' },{ label: 'Alto', value: 'alto' }];
  fumarValue: string = 'off';

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

  onClickPredecir(){
    //this.predictService.predict( 60, 1.78, peso, presion,pasos, rest, nivelFumar,nivelAlcohol );
  }


}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { GoogleApiService } from '../../core/services/googleapi.service';
import { LocalCacheService } from '../../core/services/localcache.service';
import { LOCALCACHE_AUTH } from '../../shared/constants/constants';
import { IDataSourceModel } from '../../core/models/datasource.model';
import { millisToDate, nanosToDate } from '../../shared/utils/utils';
import { IRegistroFinalModel } from '../../core/models/registroFinal.model';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ButtonModule, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private googleApiService: GoogleApiService,
    private localCacheService: LocalCacheService
  ) {
  }

  auth: any;



  presionArterialUlt?: IRegistroFinalModel;
  pasosRealizadosUlt?: IRegistroFinalModel;
  nivelSuenoUlt?: IRegistroFinalModel;
  nivelEstresUlt?: IRegistroFinalModel;


  loading: boolean = false;

  ngOnInit(): void {
    this.auth = this.localCacheService.getItem(LOCALCACHE_AUTH);
    this.onClickSincronizar();
  }

  onClickNuevaPrediccion() {
    this.router.navigate(['/app/prediction'], {
      queryParams: {
        data: encodeURI(JSON.stringify({
          presionArterial:this.presionArterialUlt,
          pasosRealizados:this.pasosRealizadosUlt,
          nivelSueno:this.nivelSuenoUlt,
          nivelEstres: this.nivelEstresUlt
        }))
      }
    })
  }

  async onClickSincronizar() {
    this.loading = true;
    this.presionArterialUlt = undefined;
    this.pasosRealizadosUlt= undefined;
    this.nivelSuenoUlt= undefined;
    this.nivelEstresUlt= undefined;
    const data: any = await this.googleApiService.getFitnessDataSources(this.auth.access_token);

    const datasourcesObj: any[] = data.dataSource;
    console.log('datasourcesObj', datasourcesObj);

    const dataSources: IDataSourceModel = this.extractDataSourceIds(
      datasourcesObj,
      [
        { streamId: 'com.google.step_count', value: 'pasosRealizados' },
        { streamId: 'com.google.heart_minutes', value: 'latidosMinuto' },
        { streamId: 'com.google.calories', value: 'calorias' },
        { streamId: 'com.google.sleep.segment', value: 'nivelSueno' },
        { streamId: 'com.google.blood_pressure', value: 'presionArterial' },
        { streamId: 'com.google.active_minutes', value: 'minutosActivos' },
        { streamId: 'com.google.activity.segment', value: 'segmentosActividad' }
      ]);

    console.log('dataSources', dataSources);

    //const calorias = await this.getDataFinal(this.auth.access_token, dataSources.calorias);
    const latidosMinuto = await this.getDataFinal(this.auth.access_token, dataSources.latidosMinuto);
    //const minutosActivos = await this.getDataFinal(this.auth.access_token, dataSources.minutosActivos);
    const nivelSueno = await this.getDataFinal(this.auth.access_token, dataSources.nivelSueno);
    const pasosRealizados = await this.getDataFinal(this.auth.access_token, dataSources.pasosRealizados);

    //console.log('calorias', calorias);
    console.log('latidosMinuto', latidosMinuto);
    //console.log('minutosActivos', minutosActivos);
    console.log('nivelSueno', nivelSueno);
    console.log('pasosRealizados', pasosRealizados);

    this.presionArterialUlt = latidosMinuto.ultimoRegistro; 
    this.pasosRealizadosUlt = pasosRealizados.ultimoRegistro;
    this.nivelSuenoUlt = nivelSueno.ultimoRegistro;
    this.nivelEstresUlt = undefined;
    this.loading = false;

  }

  private async getDataFinal(authToken: string, dataSources: string[]): Promise<{ ultimoRegistro: IRegistroFinalModel | undefined, historial: IRegistroFinalModel[] }> {

    try {
      const resp: any = await this.googleApiService.getFitnessDatasets(authToken, dataSources);
    //console.log('resp', resp);

    const data = resp.bucket
      .filter((buc: any) => {
        // Filtrar los buckets que tienen al menos un dataset con puntos
        return buc.dataset.some((dataset: any) => dataset.point.length > 0);
      })
      .flatMap((buc: any) => {
        // Combinar todos los puntos de los datasets filtrados
        return buc.dataset.flatMap((dataset: any) => {
          return dataset.point.map((point: any) => {
            // Transformar cada punto al formato deseado
            return {
              startTimeNanos: Number(point.startTimeNanos),
              startTimeHR: nanosToDate(Number(point.startTimeNanos)),
              endTimeNanos: Number(point.endTimeNanos),
              endTimeHR: nanosToDate(Number(point.endTimeNanos)),
              originDataSourceId: point.originDataSourceId,
              value: point.value[0].fpVal || point.value[0].intVal,
            };
          });
        });
      });
    // Ordenar los registros por tiempo de fin descendente
    const sortedCalories = data.sort((a: any, b: any) => b.endTimeNanos - a.endTimeNanos);

    // Obtener el último registro
    const ultimoRegistro = sortedCalories.length > 0 ? sortedCalories[0] : null;

    return {
      ultimoRegistro,
      historial: sortedCalories
    };
    } catch (error) {
      return {
        ultimoRegistro: undefined,
        historial: []
      };
    }

    
  }

  private extractDataSourceIds(datasourcesObj: any[], streams: { streamId: string, value: string }[]): IDataSourceModel {
    let dataExtract: any = {};
    streams.forEach((st: { streamId: string, value: string }) => {
      dataExtract[st.value] = datasourcesObj.filter((fit: any) => {
        const dataStreamId: string = fit.dataStreamId;
        return dataStreamId.includes(st.streamId);
      }).map((fit2: any) => fit2.dataStreamId);
    });
    return dataExtract;
  }



}

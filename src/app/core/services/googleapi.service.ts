import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';
import { getAdjustedTime } from '../../shared/utils/utils';


@Injectable({
    providedIn: 'root'
})
export class GoogleApiService {

    constructor(
        private http: HttpClient
    ) {
    }

    async getUserInfo(token:string): Promise<any> {
        const observable = this.http.get(
            'https://www.googleapis.com/oauth2/v1/userinfo', 
            { headers: new HttpHeaders({'Authorization': 'Bearer ' + token})} 
        );
        return await lastValueFrom(observable);
    }

    async getFitnessDataSources(token:string): Promise<any> {
        const observable = this.http.get(
            'https://www.googleapis.com/fitness/v1/users/me/dataSources', 
            { headers: new HttpHeaders({'Authorization': 'Bearer ' + token})} 
        );
        return await lastValueFrom(observable);
    }

    async getFitnessDatasets(token:string, dataSourceId: string[]): Promise<any> {
        const body = {
            aggregateBy: dataSourceId.map((ds:string)=>{return {dataSourceId:ds}}),
            bucketByTime: {durationMillis:86400000},
            startTimeMillis: getAdjustedTime(-1*24*10),
            endTimeMillis: getAdjustedTime()
        }; 


        //console.log('getFitnessDatasets','https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate',body);

        const observable = this.http.post(
            'https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate', 
            body,
            { headers: new HttpHeaders({'Authorization': 'Bearer ' + token})} 
        );
        return await lastValueFrom(observable);
    }
}
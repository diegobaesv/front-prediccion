import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, lastValueFrom } from 'rxjs';


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

    async getFitnessData(token:string): Promise<any> {
        const observable = this.http.get(
            'https://www.googleapis.com/fitness/v1/users/me/dataSources', 
            { headers: new HttpHeaders({'Authorization': 'Bearer ' + token})} 
        );
        return await lastValueFrom(observable);
    }
}
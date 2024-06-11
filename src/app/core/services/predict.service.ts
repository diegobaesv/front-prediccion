import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PredictService {

    constructor(
        private http: HttpClient
    ) {
    }


    async predict(edad: number, altura: number, peso: number, presion: number, pasos: number, rest_: number, nivelFumar: number, nivelBebida: number){
        const body = {
            age:edad,
            height: altura,
            weight: peso,
            pressure_level:presion,
            step_level:pasos,
            rest_level: rest_,
            smoking_consumption_level: nivelFumar,
            drink_consumption_level: nivelBebida
        }
        
        const observable = this.http.post(
            'https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate', 
            body
        );
        return await lastValueFrom(observable);
    }
}
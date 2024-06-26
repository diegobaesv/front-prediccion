import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { lastValueFrom } from "rxjs";
import { IPrediccion } from "../models/prediccion.model";
import { BASE_URL_BACKEND } from "../../shared/utils/constants";

@Injectable({
    providedIn: 'root'
})
export class PredictService {

    constructor(
        private http: HttpClient
    ) {
    }

    url:string = `${BASE_URL_BACKEND}/predicciones`;

    async predict(body: any){
        console.log('predict::body',body)
        const observable = this.http.post(
            'http://127.0.0.1:5000/predict', 
            body
        );
        return await lastValueFrom(observable);
    }

    async guardarPrediccion(body: IPrediccion){
        const observable = this.http.post(this.url, body);
        return await lastValueFrom(observable);
    }

    async listarPrediccionesPorIdUsuarioGoogle(idUsuarioGoogle: string){
        const observable = this.http.get(`${this.url}/${idUsuarioGoogle}`);
        return await lastValueFrom(observable);
    }

    async deleteOne(id: string){
        const observable = this.http.delete(`${this.url}/${id}`);
        return await lastValueFrom(observable);
    }
}
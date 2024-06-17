import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BASE_URL_BACKEND } from "../../shared/utils/constants";
import { IUsuarioGoogle } from "../models/usuariogoogle.model";
import { lastValueFrom } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class UsuariosGoogleService {

    constructor(
        private http: HttpClient) {
    }

    private url:string = `${BASE_URL_BACKEND}/usuariosGoogle`;

    async updateOrCreate(usuarioGoogle: IUsuarioGoogle){
        const observable =  this.http.post(`${this.url}/updateOrCreate`,usuarioGoogle);
        return await lastValueFrom(observable);
    }

    async findOne(idUsuarioGoogle: string){
        const observable =  this.http.get(`${this.url}/${idUsuarioGoogle}`);
        return await lastValueFrom(observable);
    }
}

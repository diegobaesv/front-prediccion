export interface IUsuarioGoogle {
    id: string;
    email: string;
    verified_email: boolean;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    fechaCreacion: Date;
    estadoAuditoria: number;
    fechaNacimiento: string;
    estatura: number;
    peso: number;
}

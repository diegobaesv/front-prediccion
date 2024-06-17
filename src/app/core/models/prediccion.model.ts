export interface IPrediccion {
    inputs: {
        age: number;
        height: number;
        weight: number;
        pressure_level: number;
        step_level: number;
        rest_level: number;
        smoking_consumption_level: number;
        drink_consumption_level: number;
    };
    output: {
        predict: number;
        recomendaciones: string;
        success: boolean;
    };
    idUsuarioGoogle: string;
    fechaCreacion?: Date;
}
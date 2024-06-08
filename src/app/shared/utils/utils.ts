export const getAdjustedTime = (hours: number = 0): number => {
    const currentTime = new Date();
    // Ajusta la fecha actual sumando o restando el número de horas proporcionado
    currentTime.setHours(currentTime.getHours() + hours);
    // Devuelve el tiempo ajustado en milisegundos desde la época
    return currentTime.getTime();
}


export const millisToDate = (millis: number): string => {
    const date = new Date(millis);

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript son 0-indexados
    const year = date.getFullYear();

    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}

export const nanosToDate = (nanos: number): string => {
    // Convertir nanosegundos a milisegundos
    const millis = nanos / 1e6;
    
    const date = new Date(millis);
  
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Los meses en JavaScript son 0-indexados
    const year = date.getFullYear();
  
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
  
    return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  }

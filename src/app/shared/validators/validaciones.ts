//Forma sencilla de manejar validators...
//Otra forma es incluyendo las validaciones en un servicio, que permita importar otros servicios (chequear validators.service.ts en esta misma carpeta)

import { FormControl } from '@angular/forms';

export const nombreApellidoPattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
export const emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

export const noPuedeSerXebaX = (control: FormControl) => {
    const valor = control.value?.trim().toLowerCase();
    if (valor === 'xebax') {
        return { noPuedeSerXebaX: true } //Cualquier objeto que se devuelva en una validación es considerado un error
    }

    return null; //Si retorno null en una validación significa que no hay errores
}

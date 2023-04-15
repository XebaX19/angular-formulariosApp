import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidatorsService {

  public nombreApellidoPattern: string = '([a-zA-Z]+) ([a-zA-Z]+)';
  public emailPattern: string = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  constructor() { } //Podría inyectar otros servicios para hacer validciones más robustas
  
  noPuedeSerXebaX (control: FormControl): ValidationErrors | null {
    const valor = control.value?.trim().toLowerCase();
    if (valor === 'xebax') {
        return { noPuedeSerXebaX: true } //Cualquier objeto que se devuelva en una validación es considerado un error
    }

    return null; //Si retorno null en una validación significa que no hay errores
  }

  passwordsIguales(campo1: string, campo2: string) {
    //Debemos retornar una función porque la validación es por referencia (no se ejecuta la función)
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const pass1 = formGroup.get(campo1)?.value;
      const pass2 = formGroup.get(campo2)?.value;
      
      if (pass1 !== pass2) {
        formGroup.get(campo2)?.setErrors({ noIguales: true });
        return { noIguales: true };
      }

      formGroup.get(campo2)?.setErrors(null);
      return null;
    }
  }
}

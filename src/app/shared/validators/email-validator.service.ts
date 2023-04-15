import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, delay, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailValidatorService implements AsyncValidator {

  constructor(private http: HttpClient) { }

  validate(control: AbstractControl<any, any>): Observable<ValidationErrors | null> {
    const email = control.value;
    return this.http.get<any[]>(`http://localhost:3000/usuarios?q=${ email }`)
      .pipe(
        //Delay para ver bien que el form queda en status "pending" mientras se ejecuta la validación asíncrona
        delay(2000),
        //El map de rxjs transforma el valor recibido en lo que quiera...
        map(resp  => {
          return (resp.length === 0) ? null : { emailRepetido: true }
        })
      );
  }
}

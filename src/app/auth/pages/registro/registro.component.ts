import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidatorService } from 'src/app/shared/validators/email-validator.service';
//import { emailPattern, noPuedeSerXebaX, nombreApellidoPattern } from 'src/app/shared/validators/validaciones'; //reemplazo lo definido en "validaciones.ts" por lo de "validators.service.ts"
import { ValidatorsService } from 'src/app/shared/validators/validators.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    //campo: ['valorInicial', [ArrayValidacionesSincronas], [ArrayValidacionesAsincronas]]...las asíncronas deben retornar una Promise o Observable
    nombre: ['', [Validators.required, Validators.pattern(this.validatorService.nombreApellidoPattern)]], //reemplazo la constante definida en "validaciones.ts" por la de "validators.service.ts"
    email: ['', [Validators.required, Validators.pattern(this.validatorService.emailPattern)], [this.emailValidator]], //reemplazo la constante definida en "validaciones.ts" por la de "validators.service.ts"
    username: ['', [Validators.required, this.validatorService.noPuedeSerXebaX]], //reemplazo la función definida en "validaciones.ts" por la de"validators.service.ts"
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required]]
  }, { //Opciones que podemos enviarle al formGroup
    validators: [this.validatorService.passwordsIguales('password', 'password2')] //Validaciones globales para todo el formulario: se dispara cada vez que el form cambia
  });

  constructor(private fb: FormBuilder, 
              private validatorService: ValidatorsService,
              private emailValidator: EmailValidatorService) { }

  ngOnInit(): void {
    this.miFormulario.reset({
      nombre: 'Seba Bellesi',
      email: 'sbellesi@angular.com',
      username: 'sbellesi'
    });
  }

  campoNoValido(campo: string) {
    return this.miFormulario.get(campo)?.invalid && this.miFormulario.get(campo)?.touched;
  }

  submitFormulario() {
    console.log(this.miFormulario.value);
    this.miFormulario.markAllAsTouched();
  }
}

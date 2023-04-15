import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-switches',
  templateUrl: './switches.component.html',
  styles: [
  ]
})
export class SwitchesComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    genero: ['M', Validators.required],
    notificaciones: [true, Validators.required],
    terminos: [false, Validators.requiredTrue]
  });

  persona = {
    genero: 'F',
    notificaciones: true
  }

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    //Para meterle valores por defecto al form
    //Se podría usar también el "setValue" pero rompe si no le paso algún campo que definí como required...esto con el "reset" no pasa ;)
    this.miFormulario.reset({
      ...this.persona,
      terminos: true
    });

    //Para sincronizar el form con el objeto "persona"
    this.miFormulario.valueChanges.subscribe(form => {
      const formCopy = {...form};
      delete formCopy.terminos;
      this.persona = formCopy;
    });

    //Para detectar el cambio en un elemento en particular del form
    // this.miFormulario.get('terminos')?.valueChanges.subscribe(newValue => {
    //   console.log(newValue);
    // });
  }

  guardar() {
    const formValue = {...this.miFormulario.value};
    delete formValue.terminos;

    this.persona = formValue;
  }
}

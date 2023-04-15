import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent implements OnInit {

  // miFormulario: FormGroup = new FormGroup({
  //   nombre: new FormControl('RTX 4080ti'),
  //   precio: new FormControl(1500),
  //   existencias: new FormControl(5)
  // });

  //En vez de dar de alta cada elemento del form con el FormControl, se puede hacer más fácil con el servicio FormBuilder
  miFormulario: FormGroup = this.fb.group({
    //campo: [valorPorDefecto, arrayValidacionesSincronas, arrayValidacionesAsincronas]
    nombre: [, [Validators.required, Validators.minLength(3)]],
    precio: [, [Validators.required, Validators.min(0)]],
    existencias: [, [Validators.required, Validators.min(0)]]
  });
  
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    //Para meterle valores por defecto al form
    //Se podría usar también el "setValue" pero rompe si no le paso algún campo que definí como required...esto con el "reset" no pasa ;)
    this.miFormulario.reset({
      nombre: 'RTX 4080ti',
      precio: 1600
      //existencias: 15
    });
  }

  esInvalido(campo: string) {
    return this.miFormulario.controls[campo].errors && this.miFormulario.controls[campo].touched;
  }

  guardar() {
    if (this.miFormulario.invalid) {
      this.miFormulario.markAllAsTouched();
      return;
    }
    
    console.log(this.miFormulario.value);
    this.miFormulario.reset();
  }
}

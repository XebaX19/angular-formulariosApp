import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-basicos',
  templateUrl: './basicos.component.html',
  styles: [
  ]
})
export class BasicosComponent implements OnInit {

  //Obtiene el NgForm referenciado con #miFormulario del HTML
  @ViewChild('miFormulario') miFormulario!: NgForm;

  initialForm = {
    producto: 'RTX 4080ti',
    precio: 10,
    existencias: 100
  };

  constructor() { }

  ngOnInit(): void {
  }

  guardar() {
    //console.log(this.miFormulario);
    console.log('Posteo correcto!');

    //this.miFormulario.resetForm(); //Para limpiar el form luego del guardado
    this.miFormulario.resetForm({    //La anterior linea deja todo en blanco. Pero también podría resetear e incluir valores por defecto
      producto: 'papita',
      precio: 0,
      existencias: 0
    }); //Puedo también limpiarlo y setearlo por defecto 
  }

  nombreInvalido(): boolean {
    return this.miFormulario?.controls['producto']?.invalid && this.miFormulario?.controls['producto']?.touched;
  }

  precioInvalido(): boolean {
    return this.miFormulario?.controls['precio']?.touched && this.miFormulario?.controls['precio']?.value <= 0;
  }
}

import { Component } from '@angular/core';

interface Persona {
  nombre: string;
  favoritos: Favorito[]
}

interface Favorito {
  id: number,
  nombre: string
}

@Component({
  selector: 'app-dinamicos',
  templateUrl: './dinamicos.component.html',
  styles: [
  ]
})
export class DinamicosComponent {

  persona: Persona = {
    nombre: 'Seba Bellesi',
    favoritos: [
      {
        id: 1,
        nombre: 'Metal Gear'
      },
      {
        id: 2,
        nombre: 'Resident Evil 3'
      }
    ]
  };

  newFavorito: string = '';

  guardar() {
    console.log('Formulario posteado!');
  }

  eliminarFavorito(index: number) {
    this.persona.favoritos.splice(index, 1);
  }

  agregarFavorito() {
    const favorito: Favorito = {
      id: this.persona.favoritos[this.persona.favoritos.length-1].id+1,
      nombre: this.newFavorito
    }
    this.persona.favoritos.push({...favorito});

    this.newFavorito = '';
  }
}

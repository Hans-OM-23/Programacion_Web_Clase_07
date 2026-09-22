import { Component, signal } from '@angular/core';
import { Persona } from '../../Interface/persona';
import { form, min, required, FormField } from '@angular/forms/signals';

@Component({
  imports: [FormField],
  selector: 'app-primer-componente',
  styleUrl: './primer-componente.css',
  templateUrl: './primer-componente.html',
})
export class PrimerComponente {

  personaModelo = signal<Persona>({nombre:'', edad: 0})

  personaFormulario = form(this.personaModelo, (esquema)=>{
    required(esquema.nombre, {message:'El nombre es obligatorio'})
    min(esquema.edad, 18, {message: 'Debes tener como minimo 18 años'})
  })


  guardar(evento:Event){
    evento.preventDefault()
    let persona = {
      'nombre': this.personaModelo().nombre,
      'edad': this.personaModelo().edad
    }
    console.log(persona)
  }
}

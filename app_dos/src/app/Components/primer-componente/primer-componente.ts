import { Component, inject, signal } from '@angular/core';
import { Persona } from '../../Interface/persona';
import { form, min, required, FormField } from '@angular/forms/signals';
import { PrimerComponenteService } from '../../Services/primer-componente.service';
import Swal from 'sweetalert2';

@Component({
  imports: [FormField],
  selector: 'app-primer-componente',
  styleUrl: './primer-componente.css',
  templateUrl: './primer-componente.html',
})
export class PrimerComponente {

  private personaService = inject(PrimerComponenteService)

  listaPersonas: Persona[] = this.personaService.mostrar()

  personaModelo = signal<Persona>({nombre:'', edad: 0})

  personaFormulario = form(this.personaModelo, (esquema)=>{
    required(esquema.nombre, {message:'El nombre es obligatorio'})
    min(esquema.edad, 18, {message: 'Debes tener como minimo 18 años'})
  })

  constructor() {
    this.mostrarPersonas()
  }


  guardar(evento:Event){
    evento.preventDefault()
    let persona = {
      'nombre': this.personaModelo().nombre,
      'edad': this.personaModelo().edad
    }
    this.personaService.guardar(persona)
    Swal.fire({
  title: "Good job!",
  text: "You clicked the button!",
  icon: "success"
  });
    this.limpiar()
  }
  mostrarPersonas(){
    this.listaPersonas = this.personaService.mostrar()
  }
  limpiar(){
      this.personaModelo.set({nombre:'', edad: 0})
  }
  }


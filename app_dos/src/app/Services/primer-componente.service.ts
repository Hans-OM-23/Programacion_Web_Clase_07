import { Service } from '@angular/core';
import { Persona } from '../Interface/persona';

@Service()
export class PrimerComponenteService {
    private listaPersonas: Persona[] = []

    guardar(persona: Persona){
        this.listaPersonas.push(persona)
    }
    
    mostrar(){
        return this.listaPersonas
    }
}

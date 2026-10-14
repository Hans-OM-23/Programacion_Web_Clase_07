import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SwapiPerson, SwapiResponse } from '../interfaces/star-wars';

@Service()
export class StarWarsService {
  private readonly urlBase = 'https://swapi.dev/api';
  private readonly http = inject(HttpClient);

  obtenerPersonajes(pagina = 1): Observable<SwapiResponse> {
    return this.http.get<SwapiResponse>(`${this.urlBase}/people/`, {
      params: { page: String(pagina) },
    });
  }

  imagenPersonaje(personaje: SwapiPerson): string {
    const iniciales = personaje.name
      .split(' ')
      .map((parte) => parte.charAt(0))
      .join('')
      .slice(0, 3)
      .toUpperCase();

    return `https://placehold.co/200x200/111827/FACC15?text=${encodeURIComponent(iniciales)}`;
  }
}
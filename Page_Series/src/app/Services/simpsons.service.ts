import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RespuestaSimpsons } from '../interfaces/simpsons';

@Service()
export class SimpsonsService {
  private readonly urlBase = 'https://thesimpsonsapi.com/api';
  private readonly http = inject(HttpClient);

  obtenerPersonajes(pagina = 1): Observable<RespuestaSimpsons> {
    return this.http.get<RespuestaSimpsons>(`${this.urlBase}/characters`, {
      params: { page: String(pagina) },
    });
  }

  imagenPersonaje(portraitPath: string): string {
    return `https://cdn.thesimpsonsapi.com/200${portraitPath}`;
  }
}
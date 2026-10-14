import { Service, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RickCharacterResponse } from '../interfaces/rick-and-morty';

@Service()
export class RickAndMortyService {
  private readonly urlBase = 'https://rickandmortyapi.com/api';
  private readonly http = inject(HttpClient);

  obtenerPersonajes(opciones: {
    pagina?: number;
    nombre?: string;
    estado?: string;
    especie?: string;
  } = {}): Observable<RickCharacterResponse> {
    const pagina = opciones.pagina ?? 1;
    let params = new HttpParams().set('page', String(pagina));

    if (opciones.nombre?.trim()) {
      params = params.set('name', opciones.nombre.trim());
    }
    if (opciones.estado && opciones.estado !== 'all') {
      params = params.set('status', opciones.estado);
    }
    if (opciones.especie?.trim()) {
      params = params.set('species', opciones.especie.trim());
    }

    return this.http.get<RickCharacterResponse>(`${this.urlBase}/character`, { params });
  }
}
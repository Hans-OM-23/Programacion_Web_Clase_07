import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {
  PokemonDetalle,
  PokemonResumen,
  PokemonTipo,
  RespuestaListaPokemon,
  RespuestaTipo,
  RespuestaTipos,
} from '../interfaces/pokemon';

@Service()
export class PokeApiService {
  private readonly urlBase = 'https://pokeapi.co/api/v2';
  private readonly http = inject(HttpClient);

  obtenerRepertorio(limit = 151, offset = 0): Observable<PokemonResumen[]> {
    return this.http
      .get<RespuestaListaPokemon>(`${this.urlBase}/pokemon?limit=${limit}&offset=${offset}`)
      .pipe(
        map((respuesta) =>
          respuesta.results.map((pokemon) => ({
            id: this.extraerId(pokemon.url),
            name: pokemon.name,
            url: pokemon.url,
            image: this.imagenOficial(pokemon.url),
          })),
        ),
      );
  }

  obtenerTipos(): Observable<PokemonTipo[]> {
    return this.http.get<RespuestaTipos>(`${this.urlBase}/type`).pipe(
      map((respuesta) =>
        respuesta.results
          .filter((tipo) => !['unknown', 'shadow', 'stellar'].includes(tipo.name))
          .sort((a, b) => a.name.localeCompare(b.name)),
      ),
    );
  }

  obtenerNombresPorTipo(tipo: string): Observable<string[]> {
    return this.http.get<RespuestaTipo>(`${this.urlBase}/type/${encodeURIComponent(tipo)}`).pipe(
      map((respuesta) => respuesta.pokemon.map((entrada) => entrada.pokemon.name)),
    );
  }

  obtenerDetalle(nombreOId: string | number): Observable<PokemonDetalle> {
    return this.http.get<PokemonDetalle>(`${this.urlBase}/pokemon/${encodeURIComponent(String(nombreOId))}`);
  }

  private extraerId(url: string): number {
    const coincidencia = url.match(/\/pokemon\/(\d+)\/?$/);
    return coincidencia ? Number(coincidencia[1]) : 0;
  }

  private imagenOficial(url: string): string {
    const id = this.extraerId(url);
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  }
}
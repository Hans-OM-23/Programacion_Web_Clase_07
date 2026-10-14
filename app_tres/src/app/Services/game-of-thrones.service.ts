import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GoTCharacter, GoTHouse } from '../interfaces/game-of-thrones';

interface GoTRawData {
  houses: Record<string, { name: string }>;
  characters: Record<string, { name: string; house: string }>;
  quotes: { character: string; sentence: string }[];
}

@Service()
export class GameOfThronesService {
  private readonly urlBase = 'https://api.gameofthronesquotes.xyz/v1';
  private readonly http = inject(HttpClient);

  obtenerPersonajes(): Observable<GoTCharacter[]> {
    return this.http
      .get<GoTRawData>('https://raw.githubusercontent.com/shevabam/game-of-thrones-quotes-api/master/datas.json')
      .pipe(
        map((data) => {
          const quotesByCharacter = new Map<string, string[]>();

          for (const quote of data.quotes) {
            const quotes = quotesByCharacter.get(quote.character) ?? [];
            quotes.push(quote.sentence);
            quotesByCharacter.set(quote.character, quotes);
          }

          return Object.entries(data.characters)
            .map(([slug, character]) => ({
              name: character.name,
              slug,
              house: {
                slug: character.house,
                name: data.houses[character.house]?.name ?? character.house,
              },
              quotes: quotesByCharacter.get(slug) ?? [],
            }))
            .filter((character) => character.quotes.length > 0);
        }),
      );
  }

  obtenerCasas(): Observable<GoTHouse[]> {
    return this.http.get<GoTHouse[]>(`${this.urlBase}/houses`);
  }

  obtenerPersonaje(slug: string): Observable<GoTCharacter[]> {
    return this.http.get<GoTCharacter[]>(`${this.urlBase}/character/${encodeURIComponent(slug)}`);
  }
}
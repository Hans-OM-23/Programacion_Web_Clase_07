import { Routes } from '@angular/router';
import { SeriesLanding } from './Components/series-landing/series-landing';
import { Pokedex } from './Components/pokedex/pokedex';
import { RickAndMorty } from './Components/rick-and-morty/rick-and-morty';
import { Simpsons } from './Components/simpsons/simpsons';
import { GameOfThrones } from './Components/game-of-thrones/game-of-thrones';
import { StarWars } from './Components/star-wars/star-wars';

export const routes: Routes = [
  { path: '', component: SeriesLanding },
  { path: 'pokemons', component: Pokedex },
  { path: 'rick-and-morty', component: RickAndMorty },
  { path: 'simpsons', component: Simpsons },
  { path: 'game-of-thrones', component: GameOfThrones },
  { path: 'star-wars', component: StarWars },
  { path: '**', redirectTo: '' },
];
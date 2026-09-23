import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Pc } from './Components/pc/pc';

@Component({
  imports: [RouterOutlet, Pc],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('Hospital');
}

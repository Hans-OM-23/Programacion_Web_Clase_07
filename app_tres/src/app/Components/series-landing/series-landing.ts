import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  imports: [RouterLink],
  selector: 'app-series-landing',
  styleUrl: './series-landing.css',
  templateUrl: './series-landing.html',
})
export class SeriesLanding implements OnInit {
  readonly oscuro = signal(false);

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      const guardado = localStorage.getItem('theme');
      this.oscuro.set(guardado === 'dark');
    }
  }

  alternarTema(): void {
    this.oscuro.update((valor) => !valor);
    localStorage.setItem('theme', this.oscuro() ? 'dark' : 'light');
  }
}
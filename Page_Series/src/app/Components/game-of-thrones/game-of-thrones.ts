import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { GameOfThronesService } from '../../Services/game-of-thrones.service';
import { GoTCharacter } from '../../interfaces/game-of-thrones';

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-game-of-thrones',
  styleUrls: ['./game-of-thrones.css', '../../styles/theme.css'],
  templateUrl: './game-of-thrones.html',
  host: {
    '[class.tema-oscuro]': 'oscuro()',
  },
})
export class GameOfThrones implements OnInit {
  private readonly servicio = inject(GameOfThronesService);

  readonly personajes = signal<GoTCharacter[]>([]);
  readonly busqueda = signal('');
  readonly cargando = signal(false);
  readonly error = signal<string | null>(null);
  readonly oscuro = signal(false);
  readonly detalle = signal<GoTCharacter | null>(null);

  readonly personajesFiltrados = computed(() => {
    const texto = this.busqueda().trim().toLowerCase();
    if (!texto) {
      return this.personajes();
    }

    return this.personajes().filter(
      (personaje) =>
        personaje.name.toLowerCase().includes(texto) ||
        personaje.house.name.toLowerCase().includes(texto) ||
        personaje.quotes.some((quote) => quote.toLowerCase().includes(texto)),
    );
  });

  ngOnInit(): void {
    this.cargar();

    if (typeof localStorage !== 'undefined') {
      this.oscuro.set(localStorage.getItem('theme') === 'dark');
    }
  }

  alternarTema(): void {
    this.oscuro.update((valor) => !valor);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', this.oscuro() ? 'dark' : 'light');
    }
  }

  cargar(): void {
    this.cargando.set(true);
    this.error.set(null);

    this.servicio.obtenerPersonajes().subscribe({
      next: (personajes) => {
        this.personajes.set(personajes);
        this.cargando.set(false);
      },
      error: () => {
        this.error.set('No se pudieron cargar los personajes y quotes de Game of Thrones.');
        this.personajes.set([]);
        this.cargando.set(false);
      },
    });
  }

  verDetalle(personaje: GoTCharacter): void {
    this.detalle.set(personaje);
  }

  imagen(personaje: GoTCharacter): string {
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(personaje.name)}&background=111827&color=facc15&size=128&bold=true`;
  }

  cerrarDetalle(): void {
    this.detalle.set(null);
  }
}
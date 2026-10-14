import { Component, OnInit, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { RickAndMortyService } from '../../Services/rick-and-morty.service';
import { RickCharacter } from '../../interfaces/rick-and-morty';

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-rick-and-morty',
  styleUrls: ['./rick-and-morty.css', '../../styles/theme.css'],
  templateUrl: './rick-and-morty.html',
  host: {
    '[class.tema-oscuro]': 'oscuro()',
  },
})
export class RickAndMorty implements OnInit {
  private readonly servicio = inject(RickAndMortyService);

  readonly personajes = signal<RickCharacter[]>([]);
  readonly info = signal<{ count: number; pages: number; next: string | null; prev: string | null } | null>(null);
  readonly pagina = signal(1);
  readonly busqueda = signal('');
  readonly estado = signal('all');
  readonly especie = signal('');
  readonly detalle = signal<RickCharacter | null>(null);
  readonly cargando = signal(false);
  readonly error = signal<string | null>(null);
  readonly oscuro = signal(false);

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

    this.servicio
      .obtenerPersonajes({
        pagina: this.pagina(),
        nombre: this.busqueda(),
        estado: this.estado(),
        especie: this.especie(),
      })
      .subscribe({
        next: (respuesta) => {
          this.personajes.set(respuesta.results);
          this.info.set(respuesta.info);
          this.cargando.set(false);
        },
        error: () => {
          this.error.set('No se pudieron cargar los personajes.');
          this.personajes.set([]);
          this.cargando.set(false);
        },
      });
  }

  onBusqueda(valor: string): void {
    this.busqueda.set(valor);
    this.pagina.set(1);
    this.cargar();
  }

  onEstado(valor: string): void {
    this.estado.set(valor);
    this.pagina.set(1);
    this.cargar();
  }

  onEspecie(valor: string): void {
    this.especie.set(valor);
    this.pagina.set(1);
    this.cargar();
  }

  anterior(): void {
    if (this.pagina() > 1) {
      this.pagina.update((pagina) => pagina - 1);
      this.cargar();
    }
  }

  siguiente(): void {
    const info = this.info();
    if (info && this.pagina() < info.pages) {
      this.pagina.update((pagina) => pagina + 1);
      this.cargar();
    }
  }

  verDetalle(personaje: RickCharacter): void {
    this.detalle.set(personaje);
  }

  cerrarDetalle(): void {
    this.detalle.set(null);
  }
}
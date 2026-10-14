import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { StarWarsService } from '../../Services/star-wars.service';
import { SwapiPerson, SwapiResponse } from '../../interfaces/star-wars';

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-star-wars',
  styleUrls: ['./star-wars.css', '../../styles/theme.css'],
  templateUrl: './star-wars.html',
  host: {
    '[class.tema-oscuro]': 'oscuro()',
  },
})
export class StarWars implements OnInit {
  private readonly servicio = inject(StarWarsService);

  readonly personajes = signal<SwapiPerson[]>([]);
  readonly info = signal<SwapiResponse | null>(null);
  readonly pagina = signal(1);
  readonly busqueda = signal('');
  readonly detalle = signal<SwapiPerson | null>(null);
  readonly cargando = signal(false);
  readonly error = signal<string | null>(null);
  readonly oscuro = signal(false);

  readonly totalPaginas = computed(() => Math.ceil((this.info()?.count ?? 0) / 10));

  readonly personajesFiltrados = computed(() => {
    const texto = this.busqueda().trim().toLowerCase();
    if (!texto) {
      return this.personajes();
    }

    return this.personajes().filter(
      (personaje) =>
        personaje.name.toLowerCase().includes(texto) ||
        personaje.gender.toLowerCase().includes(texto) ||
        personaje.birth_year.toLowerCase().includes(texto),
    );
  });

  ngOnInit(): void {
    this.cargar();

    if (typeof localStorage !== 'undefined') {
      this.oscuro.set(localStorage.getItem('theme') === 'dark');
    }
  }

  cargar(): void {
    this.cargando.set(true);
    this.error.set(null);

    this.servicio.obtenerPersonajes(this.pagina()).subscribe({
      next: (respuesta) => {
        this.personajes.set(respuesta.results);
        this.info.set(respuesta);
        this.cargando.set(false);
      },
      error: () => {
        this.error.set('No se pudieron cargar los personajes de Star Wars.');
        this.personajes.set([]);
        this.cargando.set(false);
      },
    });
  }

  anterior(): void {
    if (this.pagina() > 1) {
      this.pagina.update((pagina) => pagina - 1);
      this.cargar();
    }
  }

  siguiente(): void {
    const info = this.info();
    if (info && this.pagina() < Math.ceil(info.count / 10)) {
      this.pagina.update((pagina) => pagina + 1);
      this.cargar();
    }
  }

  verDetalle(personaje: SwapiPerson): void {
    this.detalle.set(personaje);
  }

  cerrarDetalle(): void {
    this.detalle.set(null);
  }

  alternarTema(): void {
    this.oscuro.update((valor) => !valor);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', this.oscuro() ? 'dark' : 'light');
    }
  }

  imagen(personaje: SwapiPerson): string {
    return this.servicio.imagenPersonaje(personaje);
  }
}
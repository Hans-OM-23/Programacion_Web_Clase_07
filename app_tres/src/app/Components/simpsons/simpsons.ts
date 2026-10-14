import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SimpsonsService } from '../../Services/simpsons.service';
import { SimpsonCharacter, RespuestaSimpsons } from '../../interfaces/simpsons';

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-simpsons',
  styleUrls: ['./simpsons.css', '../../styles/theme.css'],
  templateUrl: './simpsons.html',
  host: {
    '[class.tema-oscuro]': 'oscuro()',
  },
})
export class Simpsons implements OnInit {
  private readonly servicio = inject(SimpsonsService);

  readonly pagina = signal(1);
  readonly personajes = signal<SimpsonCharacter[]>([]);
  readonly info = signal<RespuestaSimpsons | null>(null);
  readonly busqueda = signal('');
  readonly cargando = signal(false);
  readonly error = signal<string | null>(null);
  readonly oscuro = signal(false);
  readonly detalle = signal<SimpsonCharacter | null>(null);

  readonly personajesFiltrados = computed(() => {
    const texto = this.busqueda().trim().toLowerCase();
    if (!texto) {
      return this.personajes();
    }

    return this.personajes().filter((personaje) =>
      personaje.name.toLowerCase().includes(texto) ||
      personaje.occupation.toLowerCase().includes(texto) ||
      personaje.status.toLowerCase().includes(texto),
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

    this.servicio.obtenerPersonajes(this.pagina()).subscribe({
      next: (respuesta) => {
        this.personajes.set(respuesta.results);
        this.info.set(respuesta);
        this.cargando.set(false);
      },
      error: () => {
        this.error.set('No se pudieron cargar los personajes de Los Simpsons.');
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
    if (info && this.pagina() < info.pages) {
      this.pagina.update((pagina) => pagina + 1);
      this.cargar();
    }
  }

  verDetalle(personaje: SimpsonCharacter): void {
    this.detalle.set(personaje);
  }

  cerrarDetalle(): void {
    this.detalle.set(null);
  }

  imagen(personaje: SimpsonCharacter): string {
    return this.servicio.imagenPersonaje(personaje.portrait_path);
  }
}
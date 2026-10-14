import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PokeApiService } from '../../Services/pokeapi.service';
import { PokemonDetalle, PokemonResumen, PokemonTipo } from '../../interfaces/pokemon';

@Component({
  imports: [FormsModule, RouterLink],
  selector: 'app-pokedex',
  styleUrls: ['./pokedex.css', '../../styles/theme.css'],
  templateUrl: './pokedex.html',
  host: {
    '[class.tema-oscuro]': 'oscuro()',
  },
})
export class Pokedex implements OnInit {
  private readonly pokeApi = inject(PokeApiService);

  readonly repertorio = signal<PokemonResumen[]>([]);
  readonly tipos = signal<PokemonTipo[]>([]);
  readonly busqueda = signal('');
  readonly tipoSeleccionado = signal('all');
  readonly nombresPorTipo = signal<string[] | null>(null);
  readonly detalle = signal<PokemonDetalle | null>(null);
  readonly cargando = signal(false);
  readonly cargandoDetalle = signal(false);
  readonly error = signal<string | null>(null);
  readonly oscuro = signal(false);
  readonly errorDetalle = signal<string | null>(null);

  readonly pokemonesFiltrados = computed(() => {
    const texto = this.busqueda().trim().toLowerCase();
    const nombresPermitidos = this.nombresPorTipo();

    return this.repertorio().filter((pokemon) => {
      const coincideTexto =
        !texto || pokemon.name.toLowerCase().includes(texto) || String(pokemon.id).includes(texto);
      const coincideTipo = !nombresPermitidos || nombresPermitidos.includes(pokemon.name);

      return coincideTexto && coincideTipo;
    });
  });

  ngOnInit(): void {
    this.cargarRepertorio();
    this.cargarTipos();

    if (typeof localStorage !== 'undefined') {
      this.oscuro.set(localStorage.getItem('theme') === 'dark');
    }
  }

  onBusqueda(valor: string): void {
    this.busqueda.set(valor);
  }

  onTipoChange(tipo: string): void {
    this.tipoSeleccionado.set(tipo);
    this.nombresPorTipo.set(null);

    if (tipo === 'all') {
      return;
    }

    this.pokeApi.obtenerNombresPorTipo(tipo).subscribe({
      next: (nombres) => this.nombresPorTipo.set(nombres),
      error: () => this.error.set(`No se pudo filtrar por el tipo ${tipo}.`),
    });
  }

  verDetalle(pokemon: PokemonResumen): void {
    this.cargandoDetalle.set(true);
    this.errorDetalle.set(null);

    this.pokeApi.obtenerDetalle(pokemon.name).subscribe({
      next: (detalle) => {
        this.detalle.set(detalle);
        this.cargandoDetalle.set(false);
      },
      error: () => {
        this.errorDetalle.set('No se pudo cargar el detalle del Pokemon.');
        this.cargandoDetalle.set(false);
      },
    });
  }

  cerrarDetalle(): void {
    this.detalle.set(null);
    this.errorDetalle.set(null);
  }

  alternarTema(): void {
    this.oscuro.update((valor) => !valor);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('theme', this.oscuro() ? 'dark' : 'light');
    }
  }

  imagenDetalle(detalle: PokemonDetalle): string {
    return (
      detalle.sprites.other?.['official-artwork']?.front_default ||
      detalle.sprites.front_default ||
      `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${detalle.id}.png`
    );
  }

  tiposDetalle(detalle: PokemonDetalle): string {
    return detalle.types.map((entrada) => entrada.type.name).join(', ');
  }

  private cargarRepertorio(): void {
    this.cargando.set(true);
    this.error.set(null);

    this.pokeApi.obtenerRepertorio().subscribe({
      next: (pokemones) => {
        this.repertorio.set(pokemones);
        this.cargando.set(false);
      },
      error: () => {
        this.error.set('No se pudo cargar el repertorio de Pokemon.');
        this.cargando.set(false);
      },
    });
  }

  private cargarTipos(): void {
    this.pokeApi.obtenerTipos().subscribe({
      next: (tipos) => this.tipos.set(tipos),
      error: () => this.error.set('No se pudieron cargar los tipos.'),
    });
  }
}
export interface PokemonResumen {
  id: number;
  name: string;
  url: string;
  image: string;
}

export interface PokemonTipo {
  name: string;
  url: string;
}

export interface RespuestaListaPokemon {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
}

export interface RespuestaTipos {
  count: number;
  results: PokemonTipo[];
}

export interface RespuestaTipo {
  pokemon: { pokemon: { name: string; url: string } }[];
}

export interface PokemonDetalle {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  types: { slot: number; type: { name: string; url: string } }[];
  abilities: { ability: { name: string; url: string }; is_hidden: boolean }[];
  stats: { base_stat: number; stat: { name: string; url: string } }[];
  sprites: {
    front_default: string | null;
    other?: { 'official-artwork'?: { front_default: string | null } };
  };
}
# AGENTS.md

## Repo layout
- Each top-level directory (`app_uno`, `app_dos`, `app_tres`, `Hospital`, `Orellana`) is a standalone Angular 22 app. There is no root-level `package.json` or shared package; run all commands inside the chosen app directory.
- Active implementation is in `app_tres`; it is currently untracked in git but follows the same Angular SSR setup.
- `node_modules` is per app. Do not add app imports for `opencode-ai`; it is only app_tres tooling noise.

## app_tres routing
- `/` shows `SeriesLanding` (centered `SERIES` title, dark/light toggle, five cover cards).
- `/pokemons` -> Pokedex (first 151 Pokémon from PokeAPI + search/type filter + detail modal).
- `/rick-and-morty` -> characters with search/status/species filters and pagination.
- `/simpsons` -> Simpsons characters, client-side search on the current page, pagination, character quotes.
- `/game-of-thrones` -> character quotes from the Game of Thrones Quotes API, searchable.
- `/star-wars` -> SWAPI characters with pagination/client-side search; character cards use generated initials, not API photos.
- Pages import their CSS plus shared `src/app/styles/theme.css`. Theme toggle is duplicated per component and uses `localStorage` key `theme`.

## Commands (run from app_tres or another app directory)
- Install: `npm install`
- Dev server: `npm start` (http://localhost:4200/)
- Production build: `npm run build`
- Dev build/watch: `npm run watch`
- Tests: `npm test` (Angular unit-test builder uses Vitest)
- Single test file: `npm test -- --watch=false --include='src/app/...spec.ts'`
- Filter by suite/test name: `npm test -- --watch=false --filter='pattern'`
- Typecheck app code: `npx tsc --noEmit -p tsconfig.app.json`
- Typecheck spec code: `npx tsc --noEmit -p tsconfig.spec.json`
- Format check/fix: `npx prettier --check .` / `npx prettier --write .`
- SSR run after build: `npm run serve:ssr:app_tres`

## Required structure and conventions
- Component/service split: components own UI/view logic; services own data/state/business logic.
- Interfaces live in `src/app/interfaces/`.
- Components live in `src/app/Components/<Name>/` with `<name>.ts`, `<name>.html`, `<name>.css`, and optional spec.
- Services live in `src/app/Services/<name>.service.ts` (+ spec when useful).
- Keep component HTML in its own `.html` file; use `templateUrl`/`styleUrl` or `styleUrls`.
- Use Angular 22 standalone components: `@Component({ imports: [...], templateUrl, styleUrl/styleUrls })`.
- Services use `@Service()` from `@angular/core`; they cannot use constructor dependency injection. Use `inject(HttpClient)` etc.
- Formatting: Prettier uses 100-char width, single quotes, 2 spaces; HTML files use the `angular` parser.
- TypeScript is strict. Angular strict DI/template settings are enabled.

## API quirks
- PokeAPI: loads 151 summary Pokémon in one request from `/pokemon?limit=151&offset=0`; detail is fetched on click. Images use official-artwork URLs with a sprite fallback in the template on error.
- Rick and Morty: API returns 20 characters per page; filters use `name`, `status`, and `species` query params; image URLs are provided by API.
- Simpsons: API returns 20 characters per page (1182 total); search filters only the current page. Posters are served from `https://cdn.thesimpsonsapi.com/200` + `portrait_path`; quotes come from `phrases`.
- Game of Thrones loads the dataset from GitHub raw (`datas.json`) and transforms it to characters; cards/modals use generated `ui-avatars.com` images. This avoids the flaky Quotes API 429 responses.
- Star Wars uses SWAPI (`/people/?page=n`, 10 results per page); there are no character images, so cards/modals use generated initial placeholders. Filter/current-page limitations are the same as Simpsons.
- Runtime API calls during SSR prerendering can hit rate limits or network failures; keep `localStorage` access guarded for SSR.

## Dark mode
- Landing uses `series.tema-oscuro`; API pages use `:host.tema-oscuro` via a shared class.
- Each page reads and writes `theme` in `localStorage` when available.
- Do not access `localStorage` during SSR without a `typeof localStorage !== 'undefined'` guard.

## Tests
- Tests run with Vitest through `ng test`; default environment is jsdom, no browser or backend required.
- The current test suite only checks that `App` creates successfully. API components are not directly covered.
- Build prerenders static routes; API failures during prerender should not fail the build as long as component errors are handled.

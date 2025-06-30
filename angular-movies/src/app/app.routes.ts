import { Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },

  {
    // lazy loading
    path: 'genres',
    loadComponent: () =>
      import('./genres/index-genres/index-genres.component').then(
        (x) => x.IndexGenresComponent
      ),
  },

  {
    path: 'genres/create',
    loadComponent: () =>
      import('./genres/create-genres/create-genres.component').then(
        (x) => x.CreateGenresComponent
      ),
  },

  {
    path: 'actors',
    loadComponent: () =>
      import('./actors/index-actors/index-actors.component').then(
        (x) => x.IndexActorsComponent
      ),
  },

  {
    path: 'actors/create',
    loadComponent: () =>
      import('./actors/create-actor/create-actor.component').then(
        (x) => x.CreateActorComponent
      ),
  },

  {
    path: 'theatres',
    loadComponent: () =>
      import('./theatres/index-theatres/index-theatres.component').then(
        (x) => x.IndexTheatresComponent
      ),
  },

  {
    path: 'theatres/create',
    loadComponent: () =>
      import('./theatres/create-theatre/create-theatre.component').then(
        (x) => x.CreateTheatreComponent
      ),
  },

  {
    path: 'movies/create',
    loadComponent: () =>
      import('./movies/create-movie/create-movie.component').then(
        (x) => x.CreateMovieComponent
      ),
  },
];

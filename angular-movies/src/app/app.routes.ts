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
    path: 'genres/edit/:id',
    loadComponent: () =>
      import('./genres/edit-genre/edit-genre.component').then(
        (x) => x.EditGenreComponent
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
    path: 'actors/edit/:id',
    loadComponent: () =>
      import('./actors/edit-actor/edit-actor.component').then(
        (x) => x.EditActorComponent
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
    path: 'theatres/edit/:id',
    loadComponent: () =>
      import('./theatres/edit-theatre/edit-theatre.component').then(
        (x) => x.EditTheatreComponent
      ),
  },

  {
    path: 'movies/create',
    loadComponent: () =>
      import('./movies/create-movie/create-movie.component').then(
        (x) => x.CreateMovieComponent
      ),
  },

  {
    path: 'movies/edit/:id',
    loadComponent: () =>
      import('./movies/edit-movie/edit-movie.component').then(
        (x) => x.EditMovieComponent
      ),
  },

  {
    path: '**',
    redirectTo: '', // landing page
  },
];

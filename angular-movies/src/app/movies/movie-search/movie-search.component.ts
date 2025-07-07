import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { GenreDto } from '../../shared/models/genre.models';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { MoviesListComponent } from '../movies-list/movies-list.component';
import { MoviesSearchDto } from '../../shared/models/movies.models';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-movie-search',
  standalone: true,
  imports: [ReactiveFormsModule, MoviesListComponent],
  templateUrl: './movie-search.component.html',
  styleUrl: './movie-search.component.scss',
})
export class MovieSearchComponent implements OnInit, OnDestroy {
  private formValueChangeSubscription!: Subscription;
  private activateRouteSubsciption!: Subscription;

  genres!: GenreDto[];
  moviesOrginal!: any[];
  moviesFiltered!: any[];

  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private location: Location = inject(Location);

  private formBuilder: FormBuilder = inject(FormBuilder);
  formGroup!: FormGroup<{
    title: FormControl<string | null>;
    genreId: FormControl<number>;
    upcomingReleases: FormControl<boolean>;
    inTheatres: FormControl<boolean>;
  }>;

  ngOnInit(): void {
    // To Do: get from DB
    this.genres = [
      { id: 1, title: 'Action' },
      { id: 2, title: 'Comedy' },
      { id: 3, title: 'Adventure' },
    ];
    // To Do: get from DB
    this.moviesOrginal = [
      {
        title: 'Inside Out 2',
        releaseDate: new Date(),
        price: 1400.99,
        poster:
          'https://upload.wikimedia.org/wikipedia/en/f/f7/Inside_Out_2_poster.jpg?20240514232832',
        genres: [1, 2, 3],
        upcomingRelease: true,
        inTheaters: false,
      },
      {
        title: 'Moana 2',
        releaseDate: new Date('2016-05-03'),
        price: 300.99,
        poster:
          'https://upload.wikimedia.org/wikipedia/en/7/73/Moana_2_poster.jpg',
        genres: [3],
        upcomingRelease: false,
        inTheaters: true,
      },
      {
        title: 'Bad Boys: Ride or Die',
        releaseDate: new Date('2016-05-03'),
        price: 300.99,
        poster:
          'https://upload.wikimedia.org/wikipedia/en/8/8b/Bad_Boys_Ride_or_Die_%282024%29_poster.jpg',
        genres: [1, 3],
        upcomingRelease: true,
        inTheaters: false,
      },
      {
        title: 'Deadpool & Wolverine',
        releaseDate: new Date('2016-05-03'),
        price: 300.99,
        poster:
          'https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Deadpool_%26_Wolverine_poster.jpg/220px-Deadpool_%26_Wolverine_poster.jpg',
        genres: [3],
        upcomingRelease: false,
        inTheaters: false,
      },
      {
        title: 'Oppenheimer',
        releaseDate: new Date('2016-05-03'),
        price: 300.99,
        poster:
          'https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/Oppenheimer_%28film%29.jpg/220px-Oppenheimer_%28film%29.jpg',
        genres: [2],
        upcomingRelease: false,
        inTheaters: true,
      },
      {
        title: 'The Flash',
        releaseDate: new Date('2016-05-03'),
        price: 300.99,
        poster:
          'https://upload.wikimedia.org/wikipedia/en/thumb/e/ed/The_Flash_%28film%29_poster.jpg/220px-The_Flash_%28film%29_poster.jpg',
        genres: [1, 2, 3],
        upcomingRelease: true,
        inTheaters: false,
      },
    ];
    this.moviesFiltered = this.moviesOrginal;

    this.formGroup = this.formBuilder.group({
      title: this.formBuilder.control('', {
        nonNullable: false,
        validators: [],
      }),
      genreId: this.formBuilder.control(0, {
        nonNullable: true,
        validators: [],
      }),
      upcomingReleases: this.formBuilder.control(false, {
        nonNullable: true,
        validators: [],
      }),
      inTheatres: this.formBuilder.control(false, {
        nonNullable: true,
        validators: [],
      }),
    });

    this.readValuesFromUrl();
    this.filterMovies(this.formGroup.value as MoviesSearchDto);

    // search by value change
    this.formValueChangeSubscription = this.formGroup.valueChanges.subscribe(
      (value) => {
        this.moviesFiltered = this.moviesOrginal;
        const searchParams = this.formGroup.value as MoviesSearchDto;
        this.filterMovies(searchParams);
        this.writeParametersInTheURL(searchParams);
      }
    );
  }

  // read URL query strings and populating form
  readValuesFromUrl(): void {
    this.activateRouteSubsciption = this.activatedRoute.queryParams.subscribe(
      (params: any) => {
        let queryStringObj: MoviesSearchDto = {
          title: null,
          genreId: 0,
          inTheatres: false,
          upcomingReleases: false,
        };
        if (params.title) {
          queryStringObj.title = params.title;
        }
        if (params.genreId) {
          queryStringObj.genreId = Number(params.genreId);
        }
        if (params.inTheatres) {
          queryStringObj.inTheatres = Boolean(params.inTheatres);
        }
        if (params.upcomingReleases) {
          queryStringObj.upcomingReleases = Boolean(params.upcomingReleases);
        }
        this.formGroup.patchValue(queryStringObj);
      }
    );
  }

  // update browser URL based on form inputs of the user
  writeParametersInTheURL(searchParams: MoviesSearchDto): void {
    let queryStrings = [];
    if (searchParams.title) {
      queryStrings.push(`title=${encodeURIComponent(searchParams.title)}`);
    }
    if (searchParams.genreId !== 0) {
      queryStrings.push(`genreId=${encodeURIComponent(searchParams.genreId)}`);
    }
    if (searchParams.inTheatres) {
      queryStrings.push(
        `inTheatres=${encodeURIComponent(searchParams.inTheatres)}`
      );
    }
    if (searchParams.upcomingReleases) {
      queryStrings.push(
        `upcomingReleases=${encodeURIComponent(searchParams.upcomingReleases)}`
      );
    }
    this.location.replaceState('movies/search', queryStrings.join('&'));
  }

  filterMovies(searchParams: MoviesSearchDto): void {
    if (searchParams.title) {
      this.moviesFiltered = this.moviesFiltered.filter((x) =>
        x.title.toLowerCase().includes(searchParams.title?.toLowerCase())
      );
    }
    if (searchParams.genreId !== 0) {
      this.moviesFiltered = this.moviesFiltered.filter(
        (x) => x.genres.indexOf(Number(searchParams.genreId)) !== -1
      );
    }
    if (searchParams.inTheatres) {
      this.moviesFiltered = this.moviesFiltered.filter((x) => x.inTheaters);
    }
    if (searchParams.upcomingReleases) {
      this.moviesFiltered = this.moviesFiltered.filter(
        (x) => x.upcomingRelease
      );
    }
  }

  get title(): FormControl<string | null> {
    return this.formGroup.controls.title;
  }

  get genreId(): FormControl<number> {
    return this.formGroup.controls.genreId;
  }

  get upcomingReleases(): FormControl<boolean> {
    return this.formGroup.controls.upcomingReleases;
  }

  get inTheatres(): FormControl<boolean> {
    return this.formGroup.controls.upcomingReleases;
  }

  onReset(): void {
    this.formGroup.reset();
  }

  onSubmit(): void {
    console.log('Movies search ', this.formGroup.value);
  }

  ngOnDestroy(): void {
    this.formValueChangeSubscription.unsubscribe();
    this.activateRouteSubsciption.unsubscribe();
  }
}

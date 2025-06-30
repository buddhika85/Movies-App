import { Component } from '@angular/core';

import { MenuComponent } from './shared/components/menu/menu.component';
// import { RatingComponent } from './shared/components/rating/rating.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MenuComponent, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  constructor() {}

  processRating(ratedValue: number) {
    console.log(`ratedValue: ${ratedValue}`);
  }
}

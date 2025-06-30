import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-rating',
  standalone: true,
  imports: [MatIconModule, NgClass],
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.scss',
})
export class RatingComponent {
  @Input({ required: true, transform: (value: number) => Array(value).fill(0) })
  maxRating!: any[];

  @Input()
  selectedRating: number = 0;

  @Output()
  rated: EventEmitter<number> = new EventEmitter<number>();

  clickedRating: number = 0;

  onMouseLeave() {
    if (this.clickedRating === 0) this.selectedRating = 0;
  }

  onMouseEnter(index: number) {
    this.selectedRating = index + 1;
  }

  onClickRating(index: number) {
    this.selectedRating = index + 1;
    this.clickedRating = this.selectedRating;

    this.rated.emit(this.selectedRating);
  }
}

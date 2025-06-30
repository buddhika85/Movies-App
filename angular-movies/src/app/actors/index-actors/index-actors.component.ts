import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-index-actors',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './index-actors.component.html',
  styleUrl: './index-actors.component.scss',
})
export class IndexActorsComponent {}

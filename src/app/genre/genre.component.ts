import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * Component to show Genre information.
 */
@Component({
  selector: 'app-genre',
  standalone: true,
  imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent, CommonModule],
  templateUrl: './genre.component.html',
  styleUrl: './genre.component.scss'
})
export class GenreComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      name: string;
      description: string;
    }
  ) {}
}

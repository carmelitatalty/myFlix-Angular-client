import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';
import { CommonModule } from '@angular/common';

/**
 * Component to show director information.
 */
@Component({
  selector: 'app-director',
  standalone: true,
  imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent, CommonModule],
  templateUrl: './director.component.html',
  styleUrl: './director.component.scss',
})
export class DirectorComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      name: string;
      bio: string;
      birthYear: string;
      deathYear?: string | null;
    }
  ) {}
}

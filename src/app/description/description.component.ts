import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatCard, MatCardHeader, MatCardTitle, MatCardContent } from '@angular/material/card';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-description',
  standalone: true,
  imports: [MatCard, MatCardHeader, MatCardTitle, MatCardContent, CommonModule],
  templateUrl: './description.component.html',
  styleUrl: './description.component.scss'
})
export class DescriptionComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      name: string,
      description: string,
    }
  ) {}

}

// src/app/movie-card/movie-card.component.ts
import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import {
  MatCard,
  MatCardTitle,
  MatCardSubtitle,
  MatCardHeader,
  MatCardActions,
} from '@angular/material/card';
import { MatDialog, MatDialogContent } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { DirectorComponent } from '../director/director.component';
import { GenreComponent } from '../genre/genre.component';
import { DescriptionComponent } from '../description/description.component';
import { Router } from '@angular/router';

/** 
 * Movie card component. Displays all the movies.
 */
@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [
    MatCard,
    MatCardTitle,
    MatCardSubtitle,
    MatDialogContent,
    CommonModule,
    MatIcon,
    MatCardHeader,
    MatCardActions,
  ],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss',
})
export class MovieCardComponent {
  movies: any[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    private router: Router,
  ) {}

  user: any = JSON.parse(localStorage.getItem('user') ?? '');

  ngOnInit(): void {
    this.getMovies();
  }

  /**
   * Add move to user's favorites
   * @param movieId movie to add as a favorite
   */
  addToFavorites(movieId: string): void {
    this.fetchApiData
      .addMovieFavorite(this.user.Username, movieId)
      .subscribe((resp: any) => {
        this.user = JSON.parse(localStorage.getItem('user') ?? '');
      });
  }

  /**
   * Remove movie from user's favorite list.
   * @param movieId movie to remove from favorite
   */
  removeFavoriteMovie(movieId: string): void {
    console.log('remove favorite');
    this.fetchApiData.removeMovieFavorite(this.user.Username, movieId)
    .subscribe(() => {
      this.user = JSON.parse(localStorage.getItem('user') ?? '');
    })
  }

  /**
   * Get all movies.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  /**
   * Open Synopsis dialog box.
   * @param movie movie to show description of.
   */
  openDescriptionDialog(movie: any): void {
    this.dialog.open(DescriptionComponent, {
      width: '280px',
      data: {
        name: movie.Title,
        description: movie.Description,
      },
    });
  }

  /**
   * Open director dialog box.
   * @param movie movie to show director information
   */
  openDirectorDialog(movie: any): void {
    this.dialog.open(DirectorComponent, {
      width: '280px',
      data: {
        name: movie.Director.Name,
        bio: movie.Director.Bio,
        birthYear: movie.Director.Birth,
        deathYear: movie.Director.Death ?? null,
      },
    });
  }

  /**
   * Open Genre dialog box.
   * @param movie movie to show genre of
   */
  openGenreDialog(movie: any): void {
    this.dialog.open(GenreComponent, {
      width: '280px',
      data: {
        name: movie.Genre.Name,
        description: movie.Genre.Description,
      },
    });
  }

  /**
   * Redirect use to profile view.
   */
  openProfile(): void {
    this.router.navigate(['profile']);
  }
}

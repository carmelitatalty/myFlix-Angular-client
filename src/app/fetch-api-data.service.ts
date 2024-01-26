/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

const apiUrl = 'https://vast-coast-62638-64c47efe4f99.herokuapp.com/';

/**
 * Service to fetch data from the API.
 */
@Injectable({
  providedIn: 'root',
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  /**
   * constructor
   * @param http the http client
   */
  constructor(private http: HttpClient) {}
  // Making the api call for the user registration endpoint
  /**
   * Registers a user
   * @param userDetails user details
   * @returns user details
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * Logs a user in through the api
   * @param loginInfo username and passowrd
   * @returns user and token
   */
  public userLogin(loginInfo: any): Observable<any> {
    const result = this.http
      .post<Response>(apiUrl + 'login', loginInfo)
      .pipe<Response, any>(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
    return result;
  }

  /**
   * Call get all movies api
   * @returns list of movies
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get<Response>(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe<Response, any>(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * Get a single movie from the API.
   * @param movieTitle movie title of the movie to get
   * @returns movie
   */
  public getMovie(movieTitle: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get<Response>(apiUrl + 'movie/' + movieTitle, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe<Response, any>(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * Get a movie genre from the API
   * @param movieGenre genre name
   * @returns movie genre information
   */
  public getGenre(movieGenre: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get<Response>(apiUrl + 'movie/' + movieGenre, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe<Response, any>(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * Call API to add a user's favorite.
   * @param username user to add the favorite to
   * @param movieId movie id to add
   * @returns user
   */
  public addMovieFavorite(username: string, movieId: string): Observable<any> {
    console.log(`Add Movie Favorite ${username}:${movieId}`)
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    user.FavoriteMovies.push(movieId)
    localStorage.setItem('user', JSON.stringify(user));

    console.log(`Token: ${token}`)
    return this.http
      .post(apiUrl + 'users/' + username + '/movies/' + movieId, null, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * Remove a movie favorite from a user.
   * @param username username to remove the movie from
   * @param movieId movie id to remove
   * @returns user
   */
  public removeMovieFavorite(
    username: string,
    movieId: string
  ): Observable<any> {
    console.log(`Remove Movie Favorite ${username}:${movieId}`)
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const index = user.FavoriteMovies.indexOf(movieId);
    if (index > -1) {
      user.FavoriteMovies.splice(index, 1);
    }
    localStorage.setItem('user', JSON.stringify(user));

    return this.http
      .delete<any>(apiUrl + 'user/favorites/' + username + '/' + movieId, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        })
      })
      .pipe<any, any>(
        map(this.extractResponseData),
        catchError(this.handleError2)
      );
  }

  /**
   * Edit a user.
   * @param username user to edit.
   * @param userDetails new user details.
   * @returns updated user.
   */
  public editUser(username: string, userDetails: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .put<Response>(apiUrl + 'users/' + username, userDetails, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe<Response, any>(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  /**
   * Delete user.
   * @param username username to delete
   * @returns 
   */
  public deleteUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .delete<Response>(apiUrl + 'users/' + username, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe<Response, any>(
        map(this.extractResponseData),
        catchError(this.handleError)
      );
  }

  // Non-typed response extraction
  /**
   * Extract response data
   * @param res response
   * @returns extracted data
   */
  private extractResponseData(res: any): any {
    console.log(`extractResponseData ${JSON.stringify(res)}`)
    const body = res;
    return body || {};
  }

  /**
   * Handle and logs error
   * @param error error to handle 
   * @returns new error.
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }

  /**
   * Handle and logs error
   * @param error error to handle 
   * @returns new error or empty string if status is 200.
   */
  private handleError2(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else if (error.status === 200) {
      return "";
    } else {
      console.error(
        `Error Status code ${error.status}, ` + `Error body is: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}

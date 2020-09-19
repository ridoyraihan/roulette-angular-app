import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WebApiService {

  constructor(
    private httpClient: HttpClient,
    @Inject('BASE_URL') private baseUrl: string
  ) {
    this.baseUrl = "https://dev-games-backend.advbet.com/v1/ab-roulette/1/";
  }

  get<T>(url: string, parmams: any = null) {
    if (!parmams) {
      return this.httpClient.get<T>(this.baseUrl + url)
        .pipe(
          catchError(this.handleError)
        );;
    } else {
      return this.httpClient.get<T>(this.baseUrl + url + parmams)
        .pipe(
          catchError(this.handleError)
        );;
    }
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.statusText);
    if (error.error instanceof ErrorEvent) {
      console.log('From error.error');
      console.error('An error occurred:', error.error.message);
    } else {
      console.log('From !error.error');
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }

    
    if (error.error["ExceptionType"]) {
      console.log('From security issue 1' );
      return throwError(error);
    }
    else {
      console.log('From security issue 2' );
      return throwError(error);
    }

  };
}

import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of, throwError, empty } from 'rxjs';
import { map, catchError, tap, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private httpClient: HttpClient) { }
  getConfigaration<T>(url: string) {
    return this.httpClient.get<T>(url);
  }
}

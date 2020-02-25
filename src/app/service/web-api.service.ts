import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';

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
      return this.httpClient.get<T>(this.baseUrl + url);
    } else {
      return this.httpClient.get<T>(this.baseUrl + url + parmams);
    }
  }
}

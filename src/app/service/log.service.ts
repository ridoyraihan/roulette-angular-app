import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LogService {

  public updateLog = new EventEmitter<string>();
  
  constructor() { }
}

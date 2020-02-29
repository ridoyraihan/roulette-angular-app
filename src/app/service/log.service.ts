import { Injectable, EventEmitter } from '@angular/core';
import { Log } from '../model/log';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  public updateLog = new EventEmitter<Log>();
  constructor() { }
}

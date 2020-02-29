import { Injectable } from '@angular/core';
import { WebApiService } from './web-api.service';
import { Spin } from '../model/spin.model';
import { Slot } from '../model/slot.model';
import { BoardConfiguration } from '../model/board-configuration.model';
import { ResultStat } from '../model/result-stat.model';
import { LogService } from './log.service';
import { Log } from '../model/log';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  protected
  constructor(
    private apiService: WebApiService,
    private logService: LogService
  ) { }

  getNextGame() {
    const log: Log = {
      time: new Date(),
      message: 'Loading next game...'
    };
    this.logService.updateLog.emit(log);
    let url = 'nextGame';
    return this.apiService.get<Spin>(url);
  }

  getBoardConfigaration() {
    const log: Log = {
      time: new Date(),
      message: 'Checking configuration...'
    };
    this.logService.updateLog.emit(log);

    let url = 'configuration';
    return this.apiService.get<BoardConfiguration>(url);
  }

  getStats(limit) {
    let url = 'stats?limit=';

    const log: Log = {
      time: new Date(),
      message: 'GET .../' + url + limit
    };
    this.logService.updateLog.emit(log);
    return this.apiService.get<ResultStat[]>(url, limit);
  }

  getWinnerSpin(gameId) {
    let url = 'game/';
    return this.apiService.get<Spin>(url, gameId);
  }
}

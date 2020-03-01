import { Injectable } from '@angular/core';
import { WebApiService } from './web-api.service';
import { Spin } from '../model/spin.model';
import { BoardConfiguration} from '../model/board-configuration.model';
import { ResultStat } from '../model/result-stat.model';
import { LogService } from 'src/app/service/log.service';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private apiService: WebApiService, private logService: LogService) { }

  getNextGame(){
    let url = 'nextGame';    
    return this.apiService.get<Spin>(url);
  }

  getBoardConfigaration() {
    let url = 'configuration';
    this.logService.updateLog.emit(new Date().toISOString() + " Loading game board");
    this.logService.updateLog.emit(new Date().toISOString() + " GET .../configuration");
    return this.apiService.get<BoardConfiguration>(url);
  }

  getStats(limit){
    let url = 'stats?limit=';
    return this.apiService.get<ResultStat[]>(url,limit);
  }

  getWinnerSpin(gameId){
    let url = 'game/';
    return this.apiService.get<Spin>(url,gameId);
  }
}

import { Injectable } from '@angular/core';
import { WebApiService } from './web-api.service';
import { Spin } from '../model/spin.model';
import { Slot } from '../model/slot.model';
import { BoardConfiguration} from '../model/board-configuration.model';
import { ResultStat } from '../model/result-stat.model';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  constructor(private apiService: WebApiService) { }

  getNextGame(){
    let url = 'nextGame';
    return this.apiService.get<Spin>(url);
  }

  getBoardConfigaration() {
    let url = 'configuration';
    return this.apiService.get<BoardConfiguration>(url);
  }

  getStats(){
    let url = 'stats?limit=';
    return this.apiService.get<ResultStat[]>(url,200);
  }
}

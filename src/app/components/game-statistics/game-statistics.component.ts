import { Component, OnInit, OnChanges, Input, SimpleChanges, AfterViewInit } from '@angular/core';
import { GameService } from 'src/app/service/game.service';
import { TableData } from 'src/app/model/table-data.model';

@Component({
  selector: 'app-game-statistics',
  templateUrl: './game-statistics.component.html',
  styleUrls: ['./game-statistics.component.css']
})
export class GameStatisticsComponent implements OnInit, OnChanges {

  @Input() gameStats:TableData[] = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if(!changes.gameStats.firstChange){
    let gameStats = <TableData[]>changes.gameStats.currentValue;
    this.gameStats = gameStats;
    }
  }

  ngOnInit() {    
  }

}

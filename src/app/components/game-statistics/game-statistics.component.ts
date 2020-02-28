import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { GameService } from 'src/app/service/game.service';
import { Slot } from 'src/app/model/slot.model';
import { TableData } from 'src/app/model/table-data.model';
TableData

@Component({
  selector: 'app-game-statistics',
  templateUrl: './game-statistics.component.html',
  styleUrls: ['./game-statistics.component.css']
})
export class GameStatisticsComponent implements OnInit, OnChanges {

  @Input() board: Slot[] = [];
  @Input() nextApiCall: number;

  public limit: number = 200;

  public gameStatsWithColor: TableData[] = [];

  constructor(private gameService: GameService) { }

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      if (propName === "board") {
        const board = <Slot[]>changes.board.currentValue;
        this.board = board;
      } else if (propName === "nextApiCall") {        
        if(!changes.nextApiCall.firstChange){
          this.nextApiCall = changes.nextApiCall.previousValue;
          this.initializeGameStats();
        }      
      }
    }
  }

  ngOnInit() {    
  }

  initializeGameStats() {    
    let _context = this;
    let getGameStats = this.gameService.getStats(this.limit);
    
    if (this.board){
      getGameStats.subscribe((result) => {   
        _context.createGameStats(result);             
      });
    } else {
    
      this.initializeGameStats();
    }   
  }

  createGameStats(gamestats) {
    this.gameStatsWithColor = [];
    gamestats.map((item) => {
      let index = this.board.findIndex(x => x.value == item.result.toString());
      let color = this.board[index].color;
      let tableData = new TableData();
      tableData.color = color;
      tableData.count = item.count;
      tableData.result = item.result
      this.gameStatsWithColor.push(tableData);
    });
    console.log(this.gameStatsWithColor)
  }

}

import { Component, OnInit } from '@angular/core';
import { GameService } from 'src/app/service/game.service';
import { forkJoin } from 'rxjs';
import { ResultStat } from 'src/app/model/result-stat.model';
import { Spin } from 'src/app/model/spin.model';
import { BoardConfiguration } from 'src/app/model/board-configuration.model';
import { Slot } from 'src/app/model/slot.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  public gameStats: ResultStat[] = [];
  public nextGame: Spin;
  public boardConfig: BoardConfiguration;
  public board: Slot[] = [];

  constructor( private gameService: GameService) { }

  ngOnInit() {
    this.initialApiCall();
  }

  initialApiCall(){
    let _context = this;
    var req0 = this.gameService.getStats();
    var req1 = this.gameService.getNextGame();    
    var req2 = this.gameService.getBoardConfigaration();
    
    forkJoin([req0, req1, req2])
      .subscribe((responseList) => {
        if (responseList[0]) {
          _context.gameStats = responseList[0];
          // console.log(_context.gameStats)
        }
        if (responseList[1]) {
          _context.nextGame = responseList[1];
          // console.log(_context.nextGame);
        }
        if (responseList[2]) {
          _context.boardConfig = responseList[2];
          // console.log(_context.boardConfig);
          _context.boardBuilder();
        }
      });
  }

  boardBuilder(){
    for (let i = 0; i < 37; i++) {
      let slot = new Slot();
      slot.value = this.boardConfig.results[i];
      slot.color = this.boardConfig.colors[i];
      slot.position = this.boardConfig.positionToId[i];
      this.board.push(slot);      
    }
    this.board.sort((a, b) =>{
      return a.position - b.position ;
    });
    console.log(this.board);
  }

}

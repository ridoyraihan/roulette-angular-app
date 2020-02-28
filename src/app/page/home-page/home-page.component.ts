import { Component, OnInit, AfterViewInit } from '@angular/core';
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
  public currentGame: Spin ;

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.initialApiCall();
  }

  initialApiCall() {
    let _context = this;    
    let req0 = this.gameService.getBoardConfigaration();
    let req1 = this.gameService.getNextGame();
    let req2 = this.gameService.getStats();

    forkJoin([req0, req1, req2])
      .subscribe((responseList) => {
        if (responseList[0]) {
          _context.boardConfig = responseList[0];
          _context.boardBuilder();
        }
        if (responseList[1]) {
          _context.nextGame = responseList[1];
          _context.getUpcomingSpins();

        }
        if (responseList[2]) {
          _context.gameStats = responseList[2];          
        }
      });
  }

  boardBuilder() {
    let sortedBoard = [];
    this.boardConfig.positionToId.map((id) => {
      let index = this.boardConfig.results.findIndex(x => x == id.toString());
      let color = this.boardConfig.colors[index];
      let slot = new Slot();
      slot.value = id.toString();
      slot.color = color;
      sortedBoard.push(slot);
    });
    this.board = sortedBoard;
  }

  getUpcomingSpins() {
    let secondToStart = this.nextGame.fakeStartDelta * 1000;
    setTimeout(() => this.getCurrentGame(), secondToStart);
  }

  getCurrentGame() {
    let _context = this;
    let getWinnerSpin = this.gameService.getWinnerSpin(this.nextGame.id);

    getWinnerSpin.subscribe((result) => {
      if (result.result == null) { // current game result not found
        setTimeout(() => _context.getCurrentGame(), 1000);
      } else { // current game result found
        _context.currentGame = result;
        _context.getNextGame();
      }
    });

  }

  getNextGame() {
    let _context = this;
    let getNextGame = this.gameService.getNextGame();
    getNextGame.subscribe((result) => {
      if (result) {
        _context.nextGame = result;
        _context.getUpcomingSpins();
      }
    });
  }
}

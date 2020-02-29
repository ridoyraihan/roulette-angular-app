import { Component, OnInit, AfterViewInit } from '@angular/core';
import { GameService } from 'src/app/service/game.service';
import { forkJoin } from 'rxjs';
import { ResultStat } from 'src/app/model/result-stat.model';
import { Spin } from 'src/app/model/spin.model';
import { BoardConfiguration } from 'src/app/model/board-configuration.model';
import { Slot } from 'src/app/model/slot.model';

declare var Spinner: any;

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
  public currentGame: Spin;

  public startInTime: number = 0;
  public interval;
  public spinner: any = null;

  constructor(private gameService: GameService) { }

  ngOnInit() {
    this.initialApiCall();    
  } 

  initialApiCall() {
    let _context = this;
    let req0 = this.gameService.getBoardConfigaration();
    let req1 = this.gameService.getNextGame();

    forkJoin([req0, req1])
      .subscribe((responseList) => {
        if (responseList[0]) {
          _context.boardConfig = responseList[0];
          _context.boardBuilder();
        }
        if (responseList[1]) {
          _context.nextGame = responseList[1];
          _context.getUpcomingSpins();
        }
      });
  }

  startTimer(startInTime) {
    this.startInTime = startInTime;
    clearInterval(this.interval);
    this.interval = setInterval(() => this.startInTime -= 1, 1000);
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
      this.start_spinning();
      if (result.result == null) { // current game result not found
        setTimeout(() => _context.getCurrentGame(), 1000);
      } else { // current game result found
        _context.currentGame = result;
        this.stop_spinning();
        _context.getNextGame();
      }
    });
  }

  start_spinning() {
    if(this.spinner == null){
      this.spinner = new Spinner({}).spin(document.getElementById('spinner'));
    }
  }

  stop_spinning() {
    this.spinner.stop()
    this.spinner = null;
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

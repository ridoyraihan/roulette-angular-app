import { Component, OnInit, AfterViewInit } from '@angular/core';
import { GameService } from 'src/app/service/game.service';
import { forkJoin } from 'rxjs';
import { Spin } from 'src/app/model/spin.model';
import { BoardConfiguration } from 'src/app/model/board-configuration.model';
import { Slot } from 'src/app/model/slot.model';
import { LogService } from 'src/app/service/log.service';

declare var Spinner: any;

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit, AfterViewInit {

  public boardConfig: BoardConfiguration;
  public board: Slot[] = [];
  public nextGame: Spin;
  public currentGame: Spin;
  public spinner: any = null;

  constructor(private gameService: GameService, private logService: LogService) { }

  ngOnInit() {

  }
  ngAfterViewInit() {
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
    this.logService.updateLog.emit(new Date().toISOString() + ' Checking for new game');
    this.logService.updateLog.emit(new Date().toISOString() + ' .../nextGame');
    this.logService.updateLog.emit(new Date().toISOString() + ' GET .../stats?limit=200');
    this.logService.updateLog.emit(new Date().toISOString() + ' sleeping for fakeStartDelta ' + this.nextGame.fakeStartDelta + ' sec');
    setTimeout(() => this.start_spinning(), this.nextGame.fakeStartDelta * 1000);
    setTimeout(() => this.getWinnerSpin(), this.nextGame.startDeltaUs / 1000);
  }

  getWinnerSpin() {
    let _context = this;
    let winnerSpin = this.gameService.getWinnerSpin(this.nextGame.id);
    if (!this.spinner) {
      this.start_spinning();
    }
    winnerSpin.subscribe((result) => {
      if (!result.outcome || !result.result) { // current game result not found 
        this.logService.updateLog.emit(new Date().toISOString() + ' Still no result continue spinning');
        setTimeout(() => {
          _context.getWinnerSpin()
        }, 50);
      } else { // current game result found
        this.logService.updateLog.emit(new Date().toISOString() + ' GET .../game/' + result.id);
        _context.currentGame = result;
        this.logService.updateLog.emit(new Date().toISOString() + ' Result is ' + result.outcome);
        _context.stop_spinning();
        _context.getNextGame();
      }
    });
  }

  start_spinning() {
    if (!this.spinner) {
      this.logService.updateLog.emit(new Date().toISOString() + ' Spinning the wheel');
    } else {
      this.logService.updateLog.emit(new Date().toISOString() + ' Wheel is already spinning');
    }
    this.spinner = new Spinner({}).spin(document.getElementById('spinner'));
  }

  stop_spinning() {
    this.logService.updateLog.emit(new Date().toISOString() + ' Stopping the wheel');
    this.spinner.stop()
    this.spinner = null;
  }

  getNextGame() {
    let _context = this;
    let nextGame = this.gameService.getNextGame();
    nextGame.subscribe((result) => {
      if (result) {
        _context.nextGame = result;
        _context.getUpcomingSpins();
      }
    });
  }

}

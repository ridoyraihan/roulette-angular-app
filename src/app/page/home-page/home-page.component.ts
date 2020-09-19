import { Component, OnInit, AfterViewInit } from '@angular/core';
import { GameService } from 'src/app/service/game.service';
import { forkJoin } from 'rxjs';
import { Spin } from 'src/app/model/spin.model';
import { BoardConfiguration } from 'src/app/model/board-configuration.model';
import { Slot } from 'src/app/model/slot.model';
import { TableData } from 'src/app/model/table-data.model';
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
  public gameStats: TableData[] = [];
  public nextGame: Spin;
  public currentGame: Spin;
  public spinner: any = null;
  public limit: number = 200;

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
          _context.initializeGameStats();
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

  initializeGameStats() {
    let _context = this;
    let getGameStats = this.gameService.getStats(this.limit);
    getGameStats.subscribe((result) => {
      _context.createGameStats(result);
    });
  }


  createGameStats(gamestats) {
    this.gameStats = [];
    gamestats.map((item) => {
      let index = this.board.findIndex(x => x.value == item.result.toString());
      let color = this.board[index].color;
      let tableData = new TableData();
      tableData.color = color;
      tableData.count = item.count;
      tableData.result = item.result
      this.gameStats.push(tableData);
    });
  }

  getUpcomingSpins() {
    this.logService.updateLog.emit(new Date().toISOString() + ' Checking for new game');
    this.logService.updateLog.emit(new Date().toISOString() + ' .../nextGame');
    this.logService.updateLog.emit(new Date().toISOString() + ' GET .../stats?limit=200');
    this.logService.updateLog.emit(new Date().toISOString() + ' sleeping for fakeStartDelta ' + this.nextGame.fakeStartDelta + ' sec');
    setTimeout(() => this.start_spinning(), this.nextGame.fakeStartDelta * 1000);
    setTimeout(() => this.getWinnerSpin(), this.nextGame.startDeltaUs / 1000);
    setTimeout(() => this.initializeGameStats(), this.nextGame.startDeltaUs / 1000);
  }

  getWinnerSpin() {
    let _context = this;
    let winnerSpin = this.gameService.getWinnerSpin(this.nextGame.id);
    if (!this.spinner) {
      this.start_spinning();
    }
    winnerSpin.subscribe((result) => {

      this.logService.updateLog.emit(new Date().toISOString() + ' GET .../game/' + result.id);
      _context.currentGame = result;
      this.logService.updateLog.emit(new Date().toISOString() + ' Result is ' + result.outcome);
      _context.stop_spinning();
      _context.getNextGame();
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

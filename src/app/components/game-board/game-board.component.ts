import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Slot } from 'src/app/model/slot.model';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit, OnChanges {

  @Input() board: Slot[] = [];
  @Input('outcome') spinOutcome: string = "";

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      if (propName === "board") {
        const board = <Slot[]>changes.board.currentValue;
        this.board = board;
      } else if (propName === "spinOutcome") {        
        if(!changes.spinOutcome.firstChange){
          let previousWinnerOutcome = changes.spinOutcome.previousValue;
          let currentWinerOutcome = changes.spinOutcome.currentValue;
          this.unmarkPreviousWinner(previousWinnerOutcome);
          this.markWinerSlot(currentWinerOutcome);         
        }      
      }
    }
  }

  unmarkPreviousWinner(outcome){
    if(outcome){
      let previousWinnerindex = this.board.findIndex(x => x.value == outcome);
      this.board[previousWinnerindex].isWinner = false;
    }
  }

  markWinerSlot(outcome){
    let index = this.board.findIndex(x => x.value === outcome);
    let winnerSlot = this.board[index];
    winnerSlot.isWinner = true;
    this.board[index] = winnerSlot;
  }

  ngOnInit() {
  }

}

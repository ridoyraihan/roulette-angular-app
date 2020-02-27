import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Slot } from 'src/app/model/slot.model';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit, OnChanges {

  @Input() board: Slot[] = [];
  @Input() winnerSlotValue: string = "";

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      if (propName === "board") {
        const board = <Slot[]>changes.board.currentValue;
        this.board = board;
      } else if (propName === "winnerSlotValue") {        
        if(!changes.winnerSlotValue.firstChange){
          let previousWinnerValue = changes.winnerSlotValue.previousValue;
          this.getPreviousWinner(previousWinnerValue);
          this.markWinerSlot();         
        }      
      }
    }
  }

  getPreviousWinner(previousWinnerValue){
    if(previousWinnerValue){
      let previousWinnerindex = this.board.findIndex(x => x.value == previousWinnerValue);
      this.board[previousWinnerindex].isWinner = false;
      // console.log("Previous Winner value",this.board[previousWinnerindex].value);
    }
  }

  markWinerSlot(){
    let index = this.board.findIndex(x => x.value == this.winnerSlotValue);
    let winnerSlot = this.board[index];
    winnerSlot.isWinner = true;
    this.board[index] = winnerSlot;
    // console.log("currentWinner",winnerSlot);
  }

  ngOnInit() {
  }

}

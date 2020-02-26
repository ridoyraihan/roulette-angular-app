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
          this.markWinerSlot();         
        }        
      }
    }
  }

  markWinerSlot(){
    let index = this.board.findIndex(x => x.value == this.winnerSlotValue);
    let winnerSlot = new Slot();
    winnerSlot.value = this.winnerSlotValue;
    winnerSlot.color = "blue";
    this.board[index] = winnerSlot;
  }

  ngOnInit() {
  }

}

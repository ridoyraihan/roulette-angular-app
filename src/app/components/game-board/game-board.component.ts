import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Slot } from 'src/app/model/slot.model';

@Component({
  selector: 'app-game-board',
  templateUrl: './game-board.component.html',
  styleUrls: ['./game-board.component.css']
})
export class GameBoardComponent implements OnInit, OnChanges {

  @Input() board: Slot[] = [];

  constructor() { }

  ngOnChanges( change: SimpleChanges){
    const board = <Slot[]>change.board.currentValue;
    this.board = board;  
    console.log(this.board)  
  }

  ngOnInit() {
  }

}

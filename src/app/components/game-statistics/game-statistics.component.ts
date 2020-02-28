import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-game-statistics',
  templateUrl: './game-statistics.component.html',
  styleUrls: ['./game-statistics.component.css']
})
export class GameStatisticsComponent implements OnInit, OnChanges {

  @Input() gameStats: any[] = []

  constructor() { }

  ngOnChanges(change: SimpleChanges){
    let gameStats = <any[]>change.gameStats.currentValue;
    if(!change.gameStats.firstChange){
    console.log(gameStats);
    } 
  }

  ngOnInit() {
  }

}

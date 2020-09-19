import { Component, OnInit, Input } from '@angular/core';
import { TableData } from 'src/app/model/table-data.model';

@Component({
  selector: 'app-game-statistics',
  templateUrl: './game-statistics.component.html',
  styleUrls: ['./game-statistics.component.css']
})
export class GameStatisticsComponent implements OnInit {

  @Input() gameStats:TableData[] = [];
  @Input() limit: number = 0;

  constructor() { }

  ngOnInit() {    
  }

}

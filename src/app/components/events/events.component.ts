import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Spin } from 'src/app/model/spin.model';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit, OnChanges {

  @Input('nextGame') game: Spin;

  public startInTime: number = 0;
  public interval;

  constructor() { }

  ngOnChanges(change: SimpleChanges) {
    const game = <Spin>change.game.currentValue;
    this.game = game;
    console.log(game);
    if (!change.game.firstChange) {
      this.startTimer(game.startDelta);
    }
  }

  startTimer(startInTime) {
    this.startInTime = startInTime;
    clearInterval(this.interval);
    this.interval = setInterval(() => this.startInTime -= 1 , 1000);   
  }

ngOnInit() {
}

}

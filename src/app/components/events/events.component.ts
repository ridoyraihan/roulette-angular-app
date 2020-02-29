import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Spin } from 'src/app/model/spin.model';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit, OnChanges {

  @Input('nextGame') nextGame: Spin;
  @Input('currentGame') currentGame: Spin;

  public startInTime: number = 0;
  public interval;
  public eventList: string[] = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      if (propName === "nextGame") {
        const nextGame = <Spin>changes.nextGame.currentValue;
        this.nextGame = nextGame;
        if (!changes.nextGame.firstChange) {
          this.startTimer(nextGame.fakeStartDelta);
        }
      } else if (propName === "currentGame") {
        if (!changes.currentGame.firstChange) {
          const currentGame = <Spin>changes.currentGame.currentValue;
          this.currentGame = currentGame;
          let event = "Game " + this.currentGame.id + " ended, result is " + this.currentGame.outcome;
          this.eventList.push(event);
        }
      }
    }
  }

  startTimer(startInTime) {
    this.startInTime = startInTime;
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.startInTime = this.startInTime - 1;}, 1000);
  }

  ngOnInit() {
  }

}

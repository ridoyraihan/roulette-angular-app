import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Spin } from 'src/app/model/spin.model';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit, OnChanges {

  @Input('nextGame') nextEvent: Spin;
  @Input('currentGame') currentEvent: Spin;

  public startInTime: number = 0;
  public interval;
  public eventList: string[] = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    for (let propName in changes) {
      if (propName === 'nextEvent') {
        const nextEvent = <Spin>changes.nextEvent.currentValue;
        this.nextEvent = nextEvent;
        if (!changes.nextEvent.firstChange) {
          this.startTimer(nextEvent.fakeStartDelta);
        }
      } else if (propName === 'currentEvent') {
        if (!changes.currentEvent.firstChange) {
          const currentEvent = <Spin>changes.currentEvent.currentValue;
          this.currentEvent = currentEvent;
          let event = 'Game ' + this.currentEvent.id + ' ended, result is ' + this.currentEvent.outcome;
          this.eventList.push(event);
        }
      }
    }
  }

  startTimer(startInTime) {
    this.startInTime = startInTime;
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      this.startInTime = this.startInTime - 1;
    }, 1000);
  }

  ngOnInit() {
  }

}

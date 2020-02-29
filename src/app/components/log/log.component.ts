import { Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { Log } from 'src/app/model/log';
import { Subscription } from 'rxjs';
import { LogService } from 'src/app/service/log.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit, OnDestroy {
  public logList: Log[] = [];
  logSubscription: Subscription;

  constructor(
    private logService: LogService
  ) { }

  //ngOnChanges(change: SimpleChanges) {
  // if (change.eventLog.firstChange) {
  //   this.msgList.push("Loading game board");
  //   this.msgList.push("GET .../configuration");
  //   this.msgList.push("Checking for new game");
  //   this.msgList.push("GET .../nextGame");
  // }
  // // let msg = change.eventLog.currentValue;
  // // this.msgList.push(msg);
  // console.log(this.msgList);
  //}

  ngOnInit() {
    this.logSubscription = this.logService.updateLog.subscribe(
      (log: Log) => {
        this.logList.push(log);
        // console.log(this.logList);
      }
    );
  }
  ngOnDestroy() {
    this.logSubscription.unsubscribe();
  }

}

import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit, OnChanges {

  @Input("msg") eventLog: string = "";

  public msgList: string[] = [];

  constructor() { }

  ngOnChanges(change: SimpleChanges){
    if(change.eventLog.firstChange){
      this.msgList.push("Loading game board");
      this.msgList.push("GET .../configuration");
      this.msgList.push("Checking for new game");
      this.msgList.push("GET .../nextGame");
    }
    // let msg = change.eventLog.currentValue;
    // this.msgList.push(msg);
    console.log(this.msgList);
  }

  ngOnInit() {
  }

}

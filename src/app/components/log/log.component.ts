import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit, OnChanges {

  @Input("logItem") eventLog: string = "";

  public msgList: string[] = [];

  constructor() { }

  ngOnChanges(change: SimpleChanges){
    let msg = change.eventLog.currentValue;
    this.msgList.push(msg);
    console.log(msg);
  }

  ngOnInit() {
  }

}

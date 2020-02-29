import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LogService } from 'src/app/service/log.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {

  public logList: string[] = [];
  logSubscription: Subscription;
  

  constructor(private logService: LogService) { }

  
  ngOnInit() {
    this.logSubscription = this.logService.updateLog.subscribe(
      (log: string) => {
        this.logList.push(log);
      }
    );
  }

}

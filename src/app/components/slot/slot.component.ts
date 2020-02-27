import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Slot } from 'src/app/model/slot.model';

@Component({
  selector: 'app-slot',
  templateUrl: './slot.component.html',
  styleUrls: ['./slot.component.css']
})
export class SlotComponent implements OnInit, OnChanges {

  @Input() slot: Slot;

  constructor() { }

  ngOnChanges( changes: SimpleChanges){
    const slot = <Slot>changes.slot.currentValue;
    this.slot = slot;
    if(slot.isWinner){
      console.log(slot);
    }  
  }
  
  ngOnInit() {
  }
}

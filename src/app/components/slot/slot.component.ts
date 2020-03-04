import { Component, OnInit, Input } from '@angular/core';
import { Slot } from 'src/app/model/slot.model';

@Component({
  selector: 'app-slot',
  templateUrl: './slot.component.html',
  styleUrls: ['./slot.component.css']
})
export class SlotComponent implements OnInit {

  @Input() slot: Slot;

  constructor() { }
  
  ngOnInit() {
  }
}

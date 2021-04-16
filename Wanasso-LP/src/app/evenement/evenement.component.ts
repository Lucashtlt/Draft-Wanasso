import { Component, Input, OnInit } from '@angular/core';
import { EventModel } from '../models/event';

@Component({
  selector: 'app-evenement',
  templateUrl: './evenement.component.html',
  styleUrls: ['./evenement.component.scss']
})
export class EvenementComponent implements OnInit {
  
  @Input() event!: EventModel;


  constructor() { }

  ngOnInit(): void {
  }

}

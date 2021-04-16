import { Component, OnInit } from '@angular/core';
import { EventModel } from '../models/event';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public eventList: Array<EventModel> = [];

  constructor(private eventService: EventService) {

  }
    
  ngOnInit(): void {

    this.eventService.getEvents().then((values) => {
      this.eventList.push(...values);
    });
  }

}

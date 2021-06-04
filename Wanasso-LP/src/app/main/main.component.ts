import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventModel } from '../models/event';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  public eventList: Array<EventModel> = [];
  public source: string = "main";

  
  constructor(private eventService: EventService,  private router: Router) {

  }

  ngOnInit(): void {
    //get all events
    this.eventService.getEvents().subscribe(
      (response) => {
        let tabEvents: Array<EventModel> = [];
        for (let obj of response) {
          tabEvents.push(new EventModel(obj._id, obj.creatingDate, obj.title, obj.description, obj.startDate, obj.endDate, obj.image, obj.type, obj.up, obj.location, obj.link, obj.partner));
        }
        this.eventList.push(...tabEvents);
      });
      console.log('main', localStorage.getItem("id_token"),
      localStorage.getItem("expires_at"))
  }


}

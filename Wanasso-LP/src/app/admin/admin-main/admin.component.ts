import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventModel } from '../../models/event';
import { PartnerModel } from '../../models/partner';
import { EventService } from '../../services/event.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public eventList: Array<EventModel> = [];
  public source: string = "admin";
 
  
  constructor(private eventService: EventService,  private router: Router) {

  }

  ngOnInit(): void {
    //get all events
    this.eventService.getEvents().subscribe(
      (response) => {
        let tabEvents: Array<EventModel> = [];
        for (let obj of response) {
          tabEvents.push(new EventModel(obj._id, obj.creatingDate, obj.title, obj.description, obj.startDate, obj.endDate, obj.image, obj.type, obj.up, obj.location, obj.link, obj.partner ));
        }
        this.eventList.push(...tabEvents);
      });
  }

  onCreateEvent() {
    return this.router.navigate(['./createEvent'])
  }
  
  onCreatePartner() {
    return this.router.navigate(['createpPartner'])
  }
}
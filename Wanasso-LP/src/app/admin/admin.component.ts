import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventModel } from '../models/event';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  public eventList: Array<EventModel> = [];
  public eventName: string = "";
  public description: string = "";
  public startDate: string = "";
  public endDate: string = "";
  public image: string = "";

  
  constructor(private eventService: EventService,  private router: Router) {

  }

  ngOnInit(): void {
    //get all events
    this.eventService.getEvents().subscribe(
      (response) => {
        let tabEvents: Array<EventModel> = [];
        for (let obj of response) {
          tabEvents.push(new EventModel(obj._id, obj.title, obj.description, obj.startDate, obj.endDate, obj.image));
        }
        this.eventList.push(...tabEvents);
      });
  }

  //créé un nouvel event lors du submit du formulaire
  onSubmit() {
    var obj = new EventModel('',
      this.eventName,
      this.description,
      new Date(this.startDate),
      new Date(this.endDate),
      this.image)
    console.log(obj);

    this.eventService.postEvent(obj).subscribe()
    //   (values: any) => {
    //   console.log(values)
    //   var objet = new EventModel(
    //     values._id,
    //     values.title,
    //     values.description,
    //     values.startDate,
    //     values.endDate,
    //     values.image
    //   );
    //   this.eventList.push(objet);
    // })


  }
}

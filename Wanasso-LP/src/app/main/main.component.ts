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
  public eventName: string = "";
  public description: string = "";
  public startDate: string= "";
  public endDate: string = "";
  public image: string = "";

  constructor(private eventService: EventService) {

  }
    
  ngOnInit(): void {

    this.eventService.getEvents().subscribe(
      (response) => {
          let tabEvents: Array<EventModel> = [];
          for (let obj of response) {
              tabEvents.push(new EventModel(obj._id, obj.title, obj.description, obj.startDate, obj.endDate, obj.image));
          }
          this.eventList.push(...tabEvents);
      });
  }

  onSubmit() {
    var obj = new EventModel('',
      this.eventName,
      this.description,
      new Date(this.startDate),
      new Date(this.endDate),
      this.image) 
    console.log(obj);
    this.eventService.postEvent(obj).subscribe((values : any)=> {
      console.log(values)
      var objet = new EventModel(
        values._id,
        values.title,
        values.description,
        values.startDate,
        values.endDate,
        values.image
        );
      this.eventList.push(objet);
    })

    
  }

}

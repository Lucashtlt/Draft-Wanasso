import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { ActivatedRoute } from '@angular/router';
import { EventModel } from '../models/event';
import { ApiHttpService } from '../config/constants'
import { Router } from '@angular/router';

@Component({
  selector: 'app-evenement-detail',
  templateUrl: './evenement-detail.component.html',
  styleUrls: ['./evenement-detail.component.scss']
})
export class EvenementDetailComponent implements OnInit {

  public event!: EventModel ;
  public eventList: Array<EventModel> = [] ;
  public id!: string;

  constructor(private eventService: EventService,  private route: ActivatedRoute, private API: ApiHttpService, private router : Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.eventService.getEvents().subscribe((values) => {
      this.eventList.push(...values)
      this.event = this.getEventById(this.eventList, this.id)!;
      console.log(this.event, this.id)
    });
  }

  getEventById(eventList : Array<EventModel>, id : string) {
    return eventList.find( x => x._id == id)
  }
  
  deleteElement() {
    this.API.delete(`http://localhost:3000/api/events/${this.id}/`).then( (res) => {
        console.log(res);
        return this.router.navigate(['']);
    }
    )
    
  }

}

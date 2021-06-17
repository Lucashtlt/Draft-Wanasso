import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { ActivatedRoute } from '@angular/router';
import { EventModel } from '../models/event';
import { ApiHttpService } from '../config/constants'
import { Router } from '@angular/router';
import { PartnerService } from '../services/partner.service';

@Component({
  selector: 'app-evenement-detail',
  templateUrl: './evenement-detail.component.html',
  styleUrls: ['./evenement-detail.component.scss']
})
export class EvenementDetailComponent implements OnInit {

  public event!: EventModel ;
  public eventList: Array<EventModel> = [] ;
  public id!: string;
  public partners: Array<any> = [];

  constructor(private eventService: EventService, private partnerService: PartnerService,  private route: ActivatedRoute, private API: ApiHttpService, private router : Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.eventService.getOneEvent(this.id).subscribe((res) => {
      this.event = res
      for(let partner of this.event.partners){
        this.partnerService.getOnePartner(partner).subscribe((newPartner) => {
          this.partners.push(newPartner)
        }
        )
      }
      console.log(this.event)
      console.log(this.partners)
    });
   
    
  }

  getEventById(eventList : Array<EventModel>, id : string) {
    return eventList.find( x => x._id == id)
  }

}

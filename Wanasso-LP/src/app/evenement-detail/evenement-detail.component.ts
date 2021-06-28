import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { ActivatedRoute } from '@angular/router';
import { EventModel } from '../models/event';
import { ApiHttpService } from '../config/constants'
import { Router } from '@angular/router';
import { PartnerService } from '../services/partner.service';
import { FileService } from '../services/file.service';
import { environment } from 'src/environments/environment';
import { FileModel } from '../models/file';

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
  public file!: FileModel;

  constructor(private fileService: FileService, private eventService: EventService, private partnerService: PartnerService,  private route: ActivatedRoute, private API: ApiHttpService, private router : Router) { }

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
      this.fileService.getOneFile(this.event.image[0]).subscribe((res2) => {
        this.file = res2;
        this.file.fileUrl = environment.baseUrl + this.file.fileUrl;
      });
    });
    
   
    
  }

  getEventById(eventList : Array<EventModel>, id : string) {
    return eventList.find( x => x._id == id)
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventModel } from '../models/event';
import { PartnerModel } from '../models/partner';
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
  public source: string = "admin";
  public eventType: string = "" ;
  public up: boolean = false;
  public location: string = "";
  public partners!: Array<PartnerModel>;
  public link: string = "";
  public typeOptions = [
    "Désobéissance civile",
    "Réunion d'accueil",
    "Marche pour le climat",
    "Formation ANV"
  ]
  public partnerOptions = [
    "XR",
    "Greenpeace"
  ]
 
  
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

  //créé un nouvel event lors du submit du formulaire
  onSubmit() {
    var obj = new EventModel('',
      new Date(),
      this.eventName,
      this.description,
      new Date(this.startDate),
      new Date(this.endDate),
      this.image,
      this.eventType,
      this.up,
      this.location,
      this.link,
      this.partners)
    console.log(obj);

    this.eventService.postEvent(obj).subscribe(
      (values: any) => {
      console.log(values)
      var objet = new EventModel(
        values._id,
        values.creatingDate,
        values.title,
        values.description,
        values.startDate,
        values.endDate,
        values.image,
        values.type,
        values.up,
        values.location,
        values.link,
        values.partners
      );
      this.eventList.push(objet);
    })


  }
  onChangeType(event:any) {
    const value = event.target.value;
    this.eventType = value;
  }
  onChangePartner(event:any) {
    const value = event.target.value;
    this.partners = value;
  }
}

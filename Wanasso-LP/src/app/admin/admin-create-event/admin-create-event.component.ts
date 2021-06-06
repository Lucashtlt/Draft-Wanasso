import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EventModel } from '../../models/event';
import { PartnerModel } from '../../models/partner';
import { EventService } from '../../services/event.service';
import { PartnerService } from '../../services/partner.service';


@Component({
  selector: 'app-admin-create-event',
  templateUrl: './admin-create-event.component.html',
  styleUrls: ['./admin-create-event.component.scss']
})
export class AdminCreateEventComponent implements OnInit {
  public eventList: Array<EventModel> = [];
  public partnerList: Array<PartnerModel> = [];
  public eventName: string = "";
  public description: string = "";
  public startDate: string = "";
  public endDate: string = "";
  public image: string = "";
  public eventType: string = "" ;
  public up: boolean = false;
  public location: string = "";
  public partners!: Array<string>;
  public link: string = "";
  public typeOptions = [
    "Désobéissance civile",
    "Réunion d'accueil",
    "Marche pour le climat",
    "Formation ANV"
  ];
  public newPartner: boolean = false;
  public name: string = "";
  public logo: string = "";
  
 
  
  constructor(private eventService: EventService, private partnerService : PartnerService,  private router: Router) {

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
     this.partnerService.getPartners().subscribe(
        (response) => {
          let tabPatners: Array<PartnerModel> = [];
          for (let obj of response) {
            tabPatners.push(new PartnerModel(obj._id, obj.name, obj.logo, obj.events));
          }
          this.partnerList.push(...tabPatners);
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
      this.onSubmitPartner(objet._id)
      .then((partner) => {
        console.log('event', objet, 'partner', partner)
        return this.router.navigate(['../admin'])
      })
      
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
  addPartner() {
    console.log("add partner")
    return this.newPartner = true;
  }

  async onSubmitPartner(id: string) {
    var obj = new PartnerModel('',
      this.name,
      this.image,
      [id]
    );
    this.partnerService.postPartner(obj).subscribe(
      (values: any) => {
      console.log(values)
      var objet = new PartnerModel(
        values._id,
        values.name,
        values.logo,
        values.events
      );
      this.partnerList.push(objet);
      return objet;
    })
  }
}

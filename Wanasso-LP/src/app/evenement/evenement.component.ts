import { Component, Input, OnInit } from '@angular/core';
import { EventModel } from '../models/event';


@Component({
  selector: 'app-evenement',
  templateUrl: './evenement.component.html',
  styleUrls: ['./evenement.component.scss']
})
export class EvenementComponent implements OnInit {
  
  @Input() event!: EventModel;
  @Input() source: string = "";

  
  constructor() { }

  ngOnInit(): void {
  }

  getLink() {
    if(this.source == "main") {
      return "evenements/" + this.event._id;
    }
    else if (this.source == "admin") {
      return this.event._id;
    }
    else {
     console.log("pas d'URL correspondant")
     return "home"
    }
  }


}

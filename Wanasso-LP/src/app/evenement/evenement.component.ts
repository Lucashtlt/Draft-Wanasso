import { Component, Input, OnInit } from '@angular/core';
import { EventModel } from '../models/event';
import { EventService } from '../services/event.service';
import { ActivatedRoute } from '@angular/router';
import { ApiHttpService } from '../config/constants'
import { Router } from '@angular/router';

@Component({
  selector: 'app-evenement',
  templateUrl: './evenement.component.html',
  styleUrls: ['./evenement.component.scss']
})
export class EvenementComponent implements OnInit {
  
  @Input() event!: EventModel;

  
  constructor() { }

  ngOnInit(): void {
  }



}

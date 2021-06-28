import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventModel } from '../models/event';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: "root"
})
export class EventService {

    constructor(private Api: HttpClient, protected Auth: AuthService) {
    }

    getAuthOptions(){
        
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              Authorization: 'Bearer ' + localStorage.getItem('id_token')
            })
          }
        return httpOptions;
    }
    //API GET
    getEvents() {
        return this.Api.get<any>(environment.baseUrl + '/api/events');
    };

    getOneEvent(id : string) {
        return this.Api.get<any>(environment.baseUrl + '/api/events/' + id + '/');
    };
    
    //API POST
    postEvent(obj: EventModel) {
        let newCreatingDate = obj.creatingDate.toISOString();
        let newStartDate = obj.startDate.toISOString();
        let newEndDate = obj.endDate.toISOString();
        let newObject = {
            creatingDate: newCreatingDate,
            title: obj.title,
            description: obj.description,
            startDate: newStartDate,
            endDate: newEndDate,
            image: obj.image,
            type: obj.type,
            up: obj.up,
            location: obj.location,
            link: obj.link,
            partners: obj.partners
        };
        return this.Api.post(environment.baseUrl + '/api/events', {event : newObject}, this.getAuthOptions() )
    };

    //API DELETE
   deleteEvent(id : string)
    {
        return this.Api.delete(environment.baseUrl + '/api/events/' + id + '/', this.getAuthOptions() );
    }
}

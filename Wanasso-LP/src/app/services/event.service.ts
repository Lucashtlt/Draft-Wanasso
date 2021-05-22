import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventModel } from '../models/event';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

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
              Authorization: 'Bearer ' + this.Auth.token?? ''
            })
          }
          console.log(this.Auth);
        return httpOptions;
    }
    //API GET
    getEvents() {
        return this.Api.get<any>('http://localhost:3000/api/events');
    };
    
    //API POST
    postEvent(obj: EventModel) {
        let newStartDate = obj.startDate.toISOString();
        let newEndDate = obj.endDate.toISOString();
        let newObject = {
            title: obj.title,
            description: obj.description,
            startDate: newStartDate,
            endDate: newEndDate,
            image: obj.image
        };
        return this.Api.post('http://localhost:3000/api/events', newObject, this.getAuthOptions())
    };

    //API DELETE
    async deleteEvent(id : string)
    {
        return this.Api.delete('http://localhost:3000/api/events/' + id + '/', this.getAuthOptions());
    }
}

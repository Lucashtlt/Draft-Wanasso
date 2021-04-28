import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventModel } from '../models/event';


@Injectable({
    providedIn: "root"
})
export class EventService {

    constructor(private Api: HttpClient) {
    }

    //API GET
    getEvents() {
        return this.Api.get<any>('http://localhost:3000/api/events')  
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
        return this.Api.post('http://localhost:3000/api/events', newObject)
    };
}

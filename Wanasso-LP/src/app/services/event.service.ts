import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EventModel } from '../models/event';


@Injectable({
    providedIn: "root"
})
export class EventService {

    constructor(private Api: HttpClient) {
    }

    getEvents() {
        return this.Api.get<any>('http://localhost:3000/api/events')
       
    };
    postEvent(obj : EventModel ) {
        return this.Api.post('http://localhost:3000/api/events', obj)
    };
}

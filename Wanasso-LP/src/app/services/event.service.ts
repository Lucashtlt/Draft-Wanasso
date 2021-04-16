import { ApiHttpService } from '../config/constants'
import { Injectable } from '@angular/core';
import { EventModel } from '../models/event';


@Injectable({
    providedIn: "root"
})
export class EventService {

    constructor(private Api: ApiHttpService) {
    }
    
    getEvents() : Promise<Array<EventModel>> {
        return this.Api.get('http://localhost:3000/api/events').then((reponse) => {
            let tabEvents: Array<EventModel> = [];
            for (let obj of reponse) {
                tabEvents.push(new EventModel(obj._id, obj.title, obj.description, obj.startDate, obj.endDate, obj.image));
            }
            return tabEvents;
        });
    }
}
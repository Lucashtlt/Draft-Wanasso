import { EventModel } from "./event"
export class PartnerModel {
    constructor(public name: string, public logo: string,  public event: EventModel ) {
    }
}
import {PartnerModel} from './partner'
export class EventModel {
    constructor(public _id: string,  
        public creatingDate: Date, 
        public title: string, 
        public description: string, 
        public startDate: Date, 
        public endDate: Date, 
        public image: string,  
        public type: string, 
        public up: boolean, 
        public location: string, 
        public link: string,
        public partners: Array<PartnerModel>,
         ) {
    }
}

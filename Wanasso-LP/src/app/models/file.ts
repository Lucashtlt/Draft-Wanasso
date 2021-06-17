export class FileModel {
    constructor(public _id: string,  
        public creatingDate: Date, 
        public title: string, 
        public description: string, 
        public fileUrl: string
         ) {
    }
}

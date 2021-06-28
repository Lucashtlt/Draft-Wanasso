import { Component, Input, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { EventModel } from '../models/event';
import { FileModel } from '../models/file';
import { FileService } from '../services/file.service';


@Component({
  selector: 'app-evenement',
  templateUrl: './evenement.component.html',
  styleUrls: ['./evenement.component.scss']
})
export class EvenementComponent implements OnInit {
  
  @Input() event!: EventModel;
  @Input() source: string = "";
  public file!: FileModel;
  
  constructor(private fileService : FileService) { }

  ngOnInit(): void {

    this.fileService.getOneFile(this.event.image[0]).subscribe((res2) => {
      console.log(this.file);
      this.file = res2;
      this.file.fileUrl = environment.baseUrl + this.file.fileUrl;
      console.log(this.file);
    });
  }

  getLink() {
    if(this.source == "main") {
      return "evenements/" + this.event._id;
    }
    else if (this.source == "admin") {
      return "events/" + this.event._id;
    }
    else {
     console.log("pas d'URL correspondant")
     return "home"
    }
  }


}

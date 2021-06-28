import { Component, OnInit } from '@angular/core';
import { EventService } from '../../services/event.service';
import { ActivatedRoute } from '@angular/router';
import { EventModel } from '../../models/event';
import { ApiHttpService } from '../../config/constants'
import { Router } from '@angular/router';
import { FileModel } from 'src/app/models/file';
import { FileService } from 'src/app/services/file.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-admin-detail',
  templateUrl: './admin-detail.component.html',
  styleUrls: ['./admin-detail.component.scss']
})
export class AdminDetailComponent implements OnInit {

  public event!: EventModel;
  public file!: FileModel;
  public eventList: Array<EventModel> = [];
  public id!: string;

  constructor(private eventService: EventService, private fileService: FileService, private route: ActivatedRoute, private API: ApiHttpService, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.eventService.getOneEvent(this.id).subscribe((res) => {
      console.log('id', this.id, 'res', res)
      this.event = res;

      this.fileService.getOneFile(this.event.image[0]).subscribe((res2) => {
        console.log(this.file);
        this.file = res2;
        this.file.fileUrl = environment.baseUrl + "/" + this.file.fileUrl;
      });
    });
  }

  deleteElement() {
    this.eventService.deleteEvent(this.id).subscribe((values) => {
      console.log(values)
      this.router.navigate(['/']);
    })
  }

}
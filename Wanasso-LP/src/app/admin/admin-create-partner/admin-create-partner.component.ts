import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FileService } from 'src/app/services/file.service';
import { PartnerModel } from '../../models/partner';
import { PartnerService } from '../../services/partner.service';
import { FileModel } from 'src/app/models/file';


@Component({
  selector: 'app-admin-create-partner',
  templateUrl: './admin-create-partner.component.html',
  styleUrls: ['./admin-create-partner.component.scss']
})
export class AdminCreatePartnerComponent implements OnInit {
  public partnerList: Array<PartnerModel> = [];
  public name: string = "";
  public image: string = "";
  public partnerId: Array<string> = [] ;
  public partner: string = "";
  public fileList: Array<FileModel> = [];
  public files: Array<any> = [];

  constructor(private partnerService : PartnerService, private fileService : FileService,  private router: Router) {

  }

  ngOnInit(): void {
    //get all events
     this.partnerService.getPartners().subscribe(
        (response) => {
          let tabPatners: Array<PartnerModel> = [];
          for (let obj of response) {
            tabPatners.push(new PartnerModel(obj._id, obj.name, obj.logo, obj.events));
          }
          this.partnerList.push(...tabPatners);
        });
        
        this.fileService.getFiles().subscribe(
          (response) => {
            let tabFiles: Array<FileModel> = [];
            for (let obj of response) {
              tabFiles.push(new FileModel(obj._id, obj.creatingDate, obj.title, obj.description, obj.fileUrl));
            }
            this.fileList.push(...tabFiles);
            for(let file of this.fileList){
              let newFile = {id: file._id, title: file.title}
              this.files.push(newFile)
            }
              
          });
        
  }

  //créé un nouvel event lors du submit du formulaire
  onSubmit() {
    var obj = new PartnerModel('',
      this.name,
      this.image,
      []
    );
    this.partnerService.postPartner(obj).subscribe(
      (values: any) => {
      console.log(values)
      var objet = new PartnerModel(
        values._id,
        values.name,
        values.logo,
        values.events
      );
      this.partnerList.push(objet);
    })
  }

  onDeletePartners() {
    console.log(this.partner)
    this.partnerService.deletePartner(this.partner).subscribe( (values) => {
      console.log(values)
      this.router.navigate(['admin']);
  })    

  }
  onChangeType(event:any) {
    const value = event.target.value;
    this.partner = value;
  }
  onChangeImage(image:any) {
    const value = image.target.value;
    this.image = value;
  }
}

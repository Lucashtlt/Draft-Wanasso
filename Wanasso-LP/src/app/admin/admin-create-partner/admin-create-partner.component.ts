import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PartnerModel } from '../../models/partner';
import { PartnerService } from '../../services/partner.service';


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

  constructor(private partnerService : PartnerService,  private router: Router) {

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
}

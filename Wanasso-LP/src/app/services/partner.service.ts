import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PartnerModel } from '../models/partner';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
    providedIn: "root"
})
export class PartnerService {

    constructor(private Api: HttpClient, protected Auth: AuthService) {
    }

    getAuthOptions(){
        
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              Authorization: 'Bearer ' + localStorage.getItem('id_token')
            })
          }
        return httpOptions;
    }
    //API GET
    getPartners() {
        return this.Api.get<any>('http://localhost:3000/api/partners');
    };

    getOnePartner(id : string) {
        return this.Api.get<any>('http://localhost:3000/api/partners/' + id + '/');
    };
    
    //API POST
    postPartner(obj: PartnerModel) {
        let newObject = {
            name: obj.name,
            logo: obj.logo,
            events: obj.events
        };
        return this.Api.post('http://localhost:3000/api/partners/', {partner : newObject}, this.getAuthOptions() )
    };

    //API DELETE
   deletePartner(id : string)
    {
        return this.Api.delete('http://localhost:3000/api/partners/' + id + '/', this.getAuthOptions() );
    }
}

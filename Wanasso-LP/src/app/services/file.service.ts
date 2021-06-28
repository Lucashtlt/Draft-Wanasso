import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FileModel } from '../models/file';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth.service';
import { stringify } from '@angular/compiler/src/util';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: "root"
})
export class FileService {

    constructor(private Api: HttpClient, protected Auth: AuthService) {
    }

    getAuthJsonOptions(){
        
        const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              Authorization: 'Bearer ' + localStorage.getItem('id_token')
            })
          }
        return httpOptions;
    }
    
    getAuthFormDataOptions(){
        
        const httpOptions = {
            headers: new HttpHeaders({
              Accept:  '*/*',
              Authorization: 'Bearer ' + localStorage.getItem('id_token')
            })
          }
        return httpOptions;
    }
    //API GET
    getFiles() {
        return this.Api.get<any>(environment.baseUrl + '/api/files');
    };

    getOneFile(id : string) {
        return this.Api.get<any>(environment.baseUrl + '/api/files/' + id + '/');
    };
    
   

    postFileWithUpload(obj: FileModel,image: File ) {
        return new Promise((resolve, reject) => {
            let newCreatingDate = obj.creatingDate.toISOString();
            let newObject = {
                creatingDate: newCreatingDate,
                title: obj.title,
                description: obj.description,
                fileUrl: ''
            };
            const thingData = new FormData();
            thingData.append('file', JSON.stringify(newObject));
            thingData.append('image', image, obj.title);
            console.log('file', JSON.stringify(newObject));
            this.Api.post(environment.baseUrl + '/api/files', thingData, this.getAuthFormDataOptions()).subscribe(
                (response) => {
                    console.log(response)
                    resolve(response);
                },
                (error) => {
                    console.log(error)
                    reject(error);
                }
            );
        })
    };

    //API DELETE
   deleteFile(id : string)
    {
        return this.Api.delete(environment.baseUrl + '/api/files/' + id + '/', this.getAuthJsonOptions() );
    }
}

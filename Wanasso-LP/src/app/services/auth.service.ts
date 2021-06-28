import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import * as moment from "moment";
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router,
    private http: HttpClient,

  ) { }

  async createNewUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.http.post(
        environment.baseUrl + '/api/auth/signup',
        { email: email, password: password })
        .subscribe(
          () => {
            this.login(email, password).then(
              () => {
                console.log('req reussi')
                resolve('succès');
              }
            ).catch(
              (error) => {
                reject(error);
              }
            );
          },
          (error) => {
            reject(error);
            console.log(error)
          }
        );
    });
  }

  login(email: string, password: string) {

    return new Promise((resolve, reject) => {
      this.http.post(
        environment.baseUrl + '/api/auth/login',
        { email: email, password: password })
        .subscribe(
          (authData: { token?: string, userId?: string, expiresIn?: number }) => {
            this.setSession(authData);
            resolve('succès');
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  private setSession(authData: { token?: string, userId?: string, expiresIn?: number }) {

    const expiresAt = moment().add(authData.expiresIn, 'hour');
    localStorage.setItem('user_id', authData.userId ?? '');
    localStorage.setItem('id_token', authData.token ?? '');
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()));
  }

  logout() {
    localStorage.removeItem("user_id");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }

  public isLoggedIn() {
    return  moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration!);
    return moment(expiresAt);
  }

}

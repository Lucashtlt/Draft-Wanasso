import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth$ = new BehaviorSubject<boolean>(false);
  token?: string = '';
  userId?: string = '';

  constructor(private router: Router,
              private http: HttpClient,
              // public jwtHelper: JwtHelperService
              ) {}

  async createNewUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.http.post(
        'http://localhost:3000/api/auth/signup',
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
        'http://localhost:3000/api/auth/login',
        { email: email, password: password })
        .subscribe(
          (authData: { token?: string, userId?: string }) => {
            this.token = authData.token;
            this.userId = authData.userId;
            console.log(this.token, this.userId)
            this.isAuth$.next(true); 
            console.log(this.isAuth$)
            resolve('succès');
          },
          (error) => {
            reject(error);
          }
        );
    });
  }

  logout() {
    this.isAuth$.next(false);
    this.userId = '';
    this.token = '';
  }

}

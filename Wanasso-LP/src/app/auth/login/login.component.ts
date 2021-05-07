import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private auth: AuthService,
              private state: StateService) {
                this.loginForm = this.formBuilder.group({
                  email: [null, [Validators.required, Validators.email]],
                  password: [null, Validators.required]
                });
              }

  ngOnInit() {
    this.state.mode$.next('form');
  }

  onLogin() {
  
    const email = this.loginForm.get('email')?.value;
    const password = this.loginForm.get('password')?.value;
    this.auth.login(email, password).then(
      () => {
          this.router.navigate(['admin']);

      }
    ).catch(
      (error) => {

        this.errorMessage = error.message;
      }
    );
  }

}

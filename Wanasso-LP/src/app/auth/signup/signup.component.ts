import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})

export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private auth: AuthService) {
                this.signupForm = new FormGroup ({
                  email: new FormControl(null, Validators.email),
                  password: new FormControl(null, Validators.required)
                })
               }

  ngOnInit() {

  }

  async onSignup() {

    const email = this.signupForm.get('email')!.value;
    const password = this.signupForm.get('password')!.value;
    this.auth.createNewUser(email, password).then(
      () => {
        console.log('user created')
          this.router.navigate(['admin']);
      }
    ).catch(
      (error) => {

        this.errorMessage = error.message;
        console.log(error.message)
      }
    );
  }
}

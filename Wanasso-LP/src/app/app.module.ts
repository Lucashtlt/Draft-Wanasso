import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EvenementComponent } from './evenement/evenement.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { EvenementDetailComponent } from './evenement-detail/evenement-detail.component';
import { MainComponent } from './main/main.component';
import { EventService } from './services/event.service'
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AdminDetailComponent } from './admin-detail/admin-detail.component';
import { AdminCreateEventComponent } from './admin-create-event/admin-create-event.component';
import { AdminCreatePartnerComponent } from './admin-create-partner/admin-create-partner.component';

@NgModule({
  declarations: [
    AppComponent,
    EvenementComponent,
    EvenementDetailComponent,
    MainComponent,
    AdminComponent,
    LoginComponent,
    SignupComponent,
    AdminDetailComponent,
    AdminCreateEventComponent,
    AdminCreatePartnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    EventService,
    AuthGuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

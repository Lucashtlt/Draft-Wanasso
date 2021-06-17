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
import { AdminComponent } from './admin/admin-main/admin.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AdminDetailComponent } from './admin/admin-detail/admin-detail.component';
import { AdminCreateEventComponent } from './admin/admin-create-event/admin-create-event.component';
import { AdminCreatePartnerComponent } from './admin/admin-create-partner/admin-create-partner.component';
import { PartnerService } from './services/partner.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { FileComponent } from './file/file.component';
registerLocaleData(localeFr, 'fr');

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
    FileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatProgressSpinnerModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    EventService,
    PartnerService,
    AuthGuardService,
    // { provide: LOCALE_ID, useValue: "fr-FR" }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

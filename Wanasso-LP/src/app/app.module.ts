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

@NgModule({
  declarations: [
    AppComponent,
    EvenementComponent,
    EvenementDetailComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [
    EventService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

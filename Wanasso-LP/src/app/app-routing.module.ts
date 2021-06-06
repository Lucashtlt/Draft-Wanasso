import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component'
import { EvenementDetailComponent } from './evenement-detail/evenement-detail.component';
import { AdminComponent } from './admin/admin-main/admin.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuardService } from './services/auth-guard.service';
import { AdminDetailComponent } from './admin/admin-detail/admin-detail.component';
import { AdminCreateEventComponent } from './admin/admin-create-event/admin-create-event.component';
import { AdminCreatePartnerComponent } from './admin/admin-create-partner/admin-create-partner.component';



const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'evenements/:id', component: EvenementDetailComponent},
  {path: 'admin', component: AdminComponent, canActivate: [AuthGuardService]},
  {path: 'admin/signup', component: SignupComponent, canActivate: [AuthGuardService]},
  {path: 'admin/events/:id', component: AdminDetailComponent, canActivate: [AuthGuardService]},
  {path: 'admin/createEvent', component: AdminCreateEventComponent, canActivate: [AuthGuardService]},
  {path: 'admin/createPartner', component: AdminCreatePartnerComponent, canActivate: [AuthGuardService]},
  {path: 'login', component: LoginComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
 
})
export class AppRoutingModule { 

}

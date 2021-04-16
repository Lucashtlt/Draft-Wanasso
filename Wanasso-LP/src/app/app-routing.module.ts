import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component'
import { EvenementDetailComponent } from './evenement-detail/evenement-detail.component';

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: ':id', component: EvenementDetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}

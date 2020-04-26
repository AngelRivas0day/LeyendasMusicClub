import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ColorsComponent } from './components/colors/colors.component';


const routes: Routes = [
  {
    path: '',
    component: ColorsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ColorsRoutingModule { }

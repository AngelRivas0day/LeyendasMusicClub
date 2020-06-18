import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GamesCategoriesComponent } from './components/games-categories/games-categories.component';


const routes: Routes = [
  {
    path: '',
    component: GamesCategoriesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GamesCategoriesRoutingModule { }

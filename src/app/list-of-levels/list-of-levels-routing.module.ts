import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayingFieldComponent } from '../playing-field/playing-field.component';
import { TasksSudokuComponent } from '../tasks-sudoku/tasks-sudoku.component';
import { ListOfLevelsPage } from './list-of-levels.page';

const routes: Routes = [
  
  {
    path:'tasks/:idLevel/:idTask',
    component: PlayingFieldComponent
  },
  {
    path:'tasks/:idLevel',
    component: TasksSudokuComponent
  },
  {
    path: '',
    component: ListOfLevelsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes) ],
  exports: [RouterModule]
})
export class ListOfLevelsPageRoutingModule {}

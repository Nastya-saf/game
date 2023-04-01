import { IonicModule, NavParams } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListOfLevelsPage } from './list-of-levels.page';

import { ListOfLevelsPageRoutingModule } from './list-of-levels-routing.module';
import { PlayingFieldComponent } from '../playing-field/playing-field.component';
import { TasksSudokuComponent } from '../tasks-sudoku/tasks-sudoku.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ListOfLevelsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ListOfLevelsPage,PlayingFieldComponent,TasksSudokuComponent],
  providers:[NavParams]
})
export class ListOfLevelsPageModule {}

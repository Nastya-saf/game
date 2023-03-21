import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import { PlayingFieldComponent } from '../playing-field/playing-field.component';
import { TasksSudokuComponent } from '../tasks-sudoku/tasks-sudoku.component';
import { ListOfLevelsComponent } from '../list-of-levels/list-of-levels.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [Tab1Page,ListOfLevelsComponent,PlayingFieldComponent,TasksSudokuComponent]
})
export class Tab1PageModule {}

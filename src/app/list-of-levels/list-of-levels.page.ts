import { Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Level } from '../interface/levels.interface';
import { SudokuService } from '../service/sudoku.service';
import { TasksSudokuComponent } from '../tasks-sudoku/tasks-sudoku.component';

@Component({
  selector: 'list-of-levels',
  templateUrl: 'list-of-levels.page.html',
  styleUrls: ['list-of-levels.page.scss']
})
export class ListOfLevelsPage implements OnDestroy,OnInit {
  

  public ListLevels:Level[]=[]

  constructor(public navCtrl: NavController, private ngZone: NgZone,private sudokuService:SudokuService) {
    }
  
  public ngOnInit(){    
    this.sudokuService.getListLevels().subscribe(value=>{
      this.ListLevels=value;
    })
  }

  public ngOnDestroy(){
  }

  public setLevel(idLevel):void{    
    this.navCtrl.navigateForward(['/tasks',idLevel]);
  }

}

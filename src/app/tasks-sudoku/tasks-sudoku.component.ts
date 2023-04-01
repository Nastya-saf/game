import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, NavParams } from '@ionic/angular';
import { ListStatusTasks } from '../interface/list-status-tasks.enum';
import { TaskLevels } from '../interface/tasks.interface';
import { SudokuService } from '../service/sudoku.service';

@Component({
  selector: 'tasks-sudoku',
  templateUrl: 'tasks-sudoku.component.html',
  styleUrls: ['tasks-sudoku.component.scss'],
})
export class TasksSudokuComponent implements OnInit {
  
  private idLevel:string;

  @ViewChild('popover') popover;

  public isOpen = false;
  public taskPopover=null;
  public listTasks:TaskLevels=null;
  public ListStatusTasks=ListStatusTasks;

  public get defaultHref():string{    
    return `/`;
  }
  
  constructor(public navCtrl: NavController, private activatedRoute: ActivatedRoute,private sudokuService:SudokuService) {}

  public ngOnInit(){  
    this.listTasks=null;
    this.idLevel=this.activatedRoute.snapshot.paramMap.get('idLevel');
    setTimeout(()=>this.getListTask(),1000);   
  }

  private getListTask():void{
    this.sudokuService.getListTaskByIdLevel(this.idLevel).subscribe(value=>{      
      this.listTasks=value;
    });
  }

  public setTask(idTask):void{    
    this.isOpen = false;
    setTimeout(() => {      
      this.navCtrl.navigateRoot([`/tasks/${this.idLevel}`,idTask]);
    }, 0);    
  }

  public presentPopover(idTask:string,e: Event) {    
    this.taskPopover=this.gitTaskById(idTask);
    this.popover.event = e;
    this.isOpen = true;
  }

  public gitTaskById(idTask):any{
    return this.listTasks.tasks.find(task=>task.idTask===idTask);
  }

}

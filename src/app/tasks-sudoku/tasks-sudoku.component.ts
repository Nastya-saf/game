import { Component, OnDestroy, OnInit } from '@angular/core';


export enum ListStatusTasks {
  finished="Закончен",
  pause="Пауза",
  new="Новый",
}

@Component({
  selector: 'tasks-sudoku',
  templateUrl: 'tasks-sudoku.component.html',
  styleUrls: ['tasks-sudoku.component.scss']
})
export class TasksSudokuComponent implements OnDestroy,OnInit {
  

  // public arrayNumber= [1,2,3,4,5,6,7,8,9 ];
  public listTasks=
    {
      id:1,
      bestTime:'15',
      tasks:[
        {
          idTask:'1',//задача
          idSolution:'1',//решение
          idAnswer:'1',//ответ
          bestTime:'15-1',
          allTime:['11','12'],
          status:ListStatusTasks.new
        },
        {
          idTask:'2',
          idSolution:'2',
          idAnswer:'2',
          bestTime:'15-2',
          allTime:['11','12'],
          status:ListStatusTasks.new
        },
        {
          idTask:'3',
          idSolution:'3',
          idAnswer:'3',
          bestTime:'15-3',
          allTime:['11','12'],
          status:ListStatusTasks.new
        }
      ]
    };
  

  constructor() {
    }
  
  public ngOnInit(){
    console.log('OnInit tasks-sudoku');
  }

  public ngOnDestroy(){
    console.log('ngOnDestroy tasks-sudoku');
  }

  public setTask(idTask):void{
    console.log('setTask idTask: ',idTask)
  }
  // public clickButton(num):void{
  //   console.log('num: ',num)
  // }

}

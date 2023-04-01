import { Injectable } from '@angular/core';
import { forkJoin, Observable, of } from 'rxjs';
import { Level } from '../interface/levels.interface';
import { Task, TaskLevels } from '../interface/tasks.interface';
import { HttpClient } from '@angular/common/http'
import { map, mergeAll, switchMap, tap } from 'rxjs/operators';
import { Sudoku, TaskSudoku } from '../interface/sudoku.interface';
import { LocalStorage } from './local-storage';

@Injectable({
  providedIn: 'root'
})
export class SudokuService {

  private localStorage=new LocalStorage();
  
  constructor(private http: HttpClient) { }

  // Получение списка уровней
  public getListLevels():Observable<Level[]> {
    const configUrl = 'assets/data/levels.json';
    return this.http.get<{data:Level[]}>(configUrl).pipe(map(item=>item.data));
  }

  // Получение списка судоку (Task)
  public getListTaskByIdLevel(idLevel:string):Observable<TaskLevels> {        
    const taskLevels=this.localStorage.getValue<TaskLevels>(`listTasks_${idLevel}`);    
    if(taskLevels){      
      return of(taskLevels);
    }else{      
      const configUrl = `assets/data/listTasks/${idLevel}.json`;
      return this.http.get<{data:TaskLevels}>(configUrl).pipe(map(item=>item.data));
    }
  }

  // Получение задачи
  public getTaskByIdLevelAndIdTask(idLevel:string,idTask:string):Observable<TaskSudoku> {
    const configUrl = `assets/data/sudoku/${idLevel}/task.json`;
    return this.http.get<{data:TaskSudoku[]}>(configUrl).pipe(map(item=>item.data.find(answer=>answer.id===idTask)));
  }

  // Получение ответа
  public getAnswerByIdLevelAndIdTask(idLevel:string,idAnswer:string):Observable<TaskSudoku> {
    const configUrl = `assets/data/sudoku/${idLevel}/answer.json`;
    return this.http.get<{data:TaskSudoku[]}>(configUrl).pipe(map(item=>item.data.find(answer=>answer.id===idAnswer)));
  }

  // Получение решения (если есть)
  public getSolutionByIdLevelAndIdTask(idLevel:string,idSolution:string):Observable<TaskSudoku> {    
    const listSolutions=this.localStorage.getValue<TaskSudoku[]>('solutions');
    if(!listSolutions){
      return of(undefined);
    }    
    const solution=listSolutions.find(item=>item&&item.id===idSolution);    
    return of(solution);
  }

  // Запись решения судоку (Task)
  public setSolution(idLevel:string,task:Task,solution:any[][]):void {    
    this.getListTaskByIdLevel(idLevel).subscribe(value=>{
      const taskIndex=value.tasks.findIndex(item=>item.idTask===task.idTask);      
      
      //получаем все решения, а потом записываем новое  значение
      let listSolutions=this.localStorage.getValue<TaskSudoku[]>('solutions');
      
      let solutionsIndex=null;      
      if(value.tasks[taskIndex].idSolution&&listSolutions){
        solutionsIndex=listSolutions.find(item=>item&&item.id===value.tasks[taskIndex].idSolution)?.id;
      }else{
        solutionsIndex=task.idTask;
      }
      if(!listSolutions){
        listSolutions=[];        
      }
      listSolutions[solutionsIndex]={
        id:`${solutionsIndex}`,
        sudoku:solution,
      };      
      this.localStorage.setValue('solutions',listSolutions);
      task.idSolution=`${solutionsIndex}`;

      // Запись списка судоку
      value.tasks[taskIndex]=task;
      this.localStorage.setValue(`listTasks_${idLevel}`,value);      
    })
  }

}

// {
//   "id": "",
//   "sudoku":[
//     [null,null,null,null,null,null,null,null,null],
//     [null,null,null,null,null,null,null,null,null],
//     [null,null,null,null,null,null,null,null,null],
//     [null,null,null,null,null,null,null,null,null],
//     [null,null,null,null,null,null,null,null,null],
//     [null,null,null,null,null,null,null,null,null],
//     [null,null,null,null,null,null,null,null,null],
//     [null,null,null,null,null,null,null,null,null],
//     [null,null,null,null,null,null,null,null,null]
//   ]
// }
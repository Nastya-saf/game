import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AlertButton, AlertController, NavParams, PopoverController } from '@ionic/angular';
import { Event } from 'ionicons/dist/types/stencil-public-runtime';
import { SudokuService } from '../service/sudoku.service';
import { forkJoin} from 'rxjs';
import { TaskSudoku } from '../interface/sudoku.interface';
import { Task, TaskLevels } from '../interface/tasks.interface';
import { ListStatusTasks } from '../interface/list-status-tasks.enum';

@Component({
  selector: 'playing-field',
  templateUrl: 'playing-field.component.html',
  styleUrls: ['playing-field.component.scss']
})
export class PlayingFieldComponent implements OnDestroy,OnInit {

  //TODO: кадждая строчка отдельный массив
  public array=[
    [1,2,3,4,5,6,7,8,9 ],
    [1,2,3,4,5,6,7,8,9 ],
    [1,2,3,4,5,6,7,8,9 ],
    
    [9,8,7,6,5,4,3,2,1],
    [9,8,7,6,5,4,3,2,1],
    [9,8,7,6,5,4,3,2,1],

    [1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1],
    [1,1,1,1,1,1,1,1,1],
  ]

  form : FormGroup;

  private _isNote=false;
  public _isDelete=false;
  public _isClue=false;
  public _isDeleteNote=false;

  public set isNote(value:boolean){
    this.resetButton();
    this._isNote=value;
  }
  public set isDelete(value:boolean){
    this.resetButton();
    this._isDelete=value;
  }
  public set isClue(value:boolean){
    this.resetButton();
    this._isClue=value;
  }
  public set isDeleteNote(value:boolean){
    this.resetButton();
    this._isDeleteNote=value;
  }

  constructor(public popoverController: PopoverController,private alertController: AlertController,public navParams: NavParams, private activatedRoute: ActivatedRoute,private sudokuService:SudokuService) {
    this.form = new FormGroup({
      "sudoky": new FormArray([
      ])
    });
  }

  public arrayNumber= [1,2,3,4,5,6,7,8,9];

  private resetButton():void{    
    this._isNote=false;
    this._isDelete=false;
    this._isClue=false;
    this._isDeleteNote=false;
  }

  public clickButton(num):void{    
    this.isOpen = false;
    this.setValue(num);
  }

  @ViewChild('popover') popover;

  public isOpen = false;
  private clickIndex=[];

  public presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }

  private setValue(value):void{
    if(this._isNote){
      // заметка
      const arr=(new Array(9)).fill(null);      
      arr[this.clickIndex[0]]=value;      
      this.getFormsArray(this.getFormsArray()[this.clickIndex[0]])[this.clickIndex[1]]=this.setFormArrayWithNineControls(arr); 
      return;
    }else{
      if(this.clickIndex.length===3 && !this._isDeleteNote){        
        // TODO: заменить вот это вот на отдельные функции для основного элемента и для заметки :)
        this.getFormsArray(this.getFormsArray(this.getFormsArray()[this.clickIndex[0]])[this.clickIndex[1]])[this.clickIndex[2]].setValue(value);
      }else{        
        if(!this.isControl(this.getFormsArray(this.getFormsArray()[this.clickIndex[0]])[this.clickIndex[1]])){
          this.getFormsArray(this.getFormsArray()[this.clickIndex[0]])[this.clickIndex[1]]=new FormControl();
        }

        this.getFormsArray(this.getFormsArray()[this.clickIndex[0]])[this.clickIndex[1]].setValue(value);
      }
    }
    this.clickIndex=[];
    this.resetButton();
  }

  public clickField(index:number[],e=null){    
    if(this.getReadonly(index[0],index[1])){
      return;
    }
    
    if(this._isDelete){
      // Удалить
      this.isDelete=false;
      this.delete(index);
      return;
    }
    if(this._isClue){
      // Подсказка
      this.isClue=false;
      this.clue(index);
      return;
    }
    this.clickIndex=index;
    this.presentPopover(e);
  }

  public note(index:number[]):void{
    
    this.getFormsControlsItem(index[0])[index[1]]=this.setFormArrayWithNineControls([null,null,3,null,null,null,null,null,null,]); 
  }

  public delete(index:number[]):void{
    if(index.length===3){      
      this.getFormsArray(this.getFormsArray(this.getFormsArray()[index[0]])[index[1]])[index[2]].setValue(null)
    }else{      
      this.getFormsControlsItem(index[0])[index[1]].setValue(null);
    }

  }

  public clue(index:number[]):void{    
    this.clickIndex=index;
    this.setValue(this.answer[index[0]][index[1]]);
  }

  private setFormArrayWithNineControls(arrayValues:Array<number>=new Array(9)):FormArray{
    const newArray=new FormArray([]);
    arrayValues.forEach((item,index)=>{      
      (newArray as FormArray).push(new FormControl(item));
      (newArray as FormArray).controls[index].valueChanges.subscribe(value=>{
      })
    });
    return newArray;
  }

 public getFormsControlsSudoky() : AbstractControl[]{    
    return (this.form.controls.sudoky as FormArray)?.controls;
  }

  public getFormsControlsItem(index:number) : AbstractControl[]{    
    return (this.getFormsControlsSudoky()[index] as FormArray)?.controls;
  }

  public getFormsArray(item=null): AbstractControl[]{
    return (item?item:this.form.controls.sudoky as FormArray)?.controls;
  }

  public isControl(item:AbstractControl):boolean{
    return !(item instanceof FormArray);
  }

  public task:any[][];
  public answer:any[][];
  public solution:any[][];
  private idLevel;
  private taskLevels:Task;

  public get defaultHref():string{    
    return `/tasks/${this.idLevel}`;
  }
  
  public ngOnInit(){    
    this.idLevel=this.activatedRoute.snapshot.paramMap.get('idLevel');
    const idTask=this.activatedRoute.snapshot.paramMap.get('idTask');
    this.sudokuService.getListTaskByIdLevel(this.idLevel).subscribe(value=>{
      this.taskLevels=value.tasks.find(task=>task.idTask===idTask);
      forkJoin(
        this.sudokuService.getTaskByIdLevelAndIdTask(this.idLevel,this.taskLevels.idTask),
        this.sudokuService.getAnswerByIdLevelAndIdTask(this.idLevel,this.taskLevels.idAnswer),
        this.sudokuService.getSolutionByIdLevelAndIdTask(this.idLevel,this.taskLevels.idSolution)
      ).subscribe(tasks=>{
        this.task=tasks[0]?.sudoku;
        this.answer=tasks[1]?.sudoku;
        this.solution=tasks[2]?.sudoku;        
        this.fillingFields();
      })
    })
  }

  private fillingFields():void{    
    this.task.forEach((item)=>{
      (this.form.controls.sudoky as FormArray).push(this.setFormArrayWithNineControls(item));
    });
    if(this.solution){
      this.solution.forEach((item,i)=>{
        item.forEach((value,j)=>{
          if(value && typeof value==='object'){            
            this.getFormsControlsItem(i)[j]=(this.setFormArrayWithNineControls(value));
          }
          else{
            this.clickIndex=[i,j];
            this.setValue(value);
          }
        })
      })
    }
  }

  public getReadonly(i,j):boolean{
    return !!this.task[i][j];
  }

  public ngOnDestroy(){    
    this.save();
  }

  private save():void{    
    const solution=this.getCurrentSolution();    
    this.taskLevels.status=this.getStatusTasks();    
    if(this.taskLevels.status!==ListStatusTasks.new){
      this.sudokuService.setSolution(this.idLevel,this.taskLevels, solution)
    }
 
  }

  private getCurrentSolution():number[][]{
    const solution=[[],[],[],[],[],[],[],[],[]];    
    for(let i=0;i<9;i++){
      for(let j=0;j<9;j++){
        solution[i][j]= this.getFormsControlsItem(i)[j].value;
      }
    }
    return solution;
  }

  private checkSolution():boolean{
    const solution=this.getCurrentSolution();    
    return JSON.stringify(solution) === JSON.stringify(this.answer);
  }

  private getStatusTasks():ListStatusTasks{
    const solution=this.getCurrentSolution();
    if(JSON.stringify(solution) === JSON.stringify(this.answer)){
      return ListStatusTasks.finished
    }
    if(JSON.stringify(solution) === JSON.stringify(this.task)){
      return ListStatusTasks.new
    }
    return ListStatusTasks.pause;
  }

}

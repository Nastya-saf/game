import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'list-of-levels',
  templateUrl: 'list-of-levels.component.html',
  styleUrls: ['list-of-levels.component.scss']
})
export class ListOfLevelsComponent implements OnDestroy,OnInit {
  

  public ListLevels= [
    {
      id: '1',
      name: 'name-1'
    },
    {
      id: '2',
      name: 'name-2'
    },
    {
      id: '3',
      name: 'name-3'
    },
    {
      id: '4',
      name: 'name-4'
    },
    {
      id: '5',
      name: 'name-5'
    },
   ];

  constructor() {
    }
  
  public ngOnInit(){
    console.log('OnInit list-of-levels');
  }

  public ngOnDestroy(){
    console.log('ngOnDestroy list-of-levels');
  }

  public setLevel(idLevel):void{
    console.log('setLevel idLevel: ', idLevel);
  }

  // public clickButton(num):void{
  //   console.log('num: ',num)
  // }

}

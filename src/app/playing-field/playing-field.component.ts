import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { AlertButton, AlertController, PopoverController } from '@ionic/angular';
import { Event } from 'ionicons/dist/types/stencil-public-runtime';
// import { GamepadComponent } from '../list-of-levels/list-of-levels.component';

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
  // gamepad - компонент с кнопками
  //playing-field

  public isNote=false;
  public isDelete=false;
  public isClue=false;

  constructor(public popoverController: PopoverController,private alertController: AlertController) {
    this.form = new FormGroup({
      "sudoky": new FormArray([
      ])
    });

    this.array.forEach((item,index)=>{
      (this.form.controls.sudoky as FormArray).push(this.setFormArrayWithNineControls(item));
      
    })
    console.log('array: ',this.form)
    // заполнение
    this.getFormsControlsItem(0)[0].setValue(77);
    for(let i=0;i<9;i++){
      for(let j=0;j<9;j++){
        this.getFormsControlsItem(i)[j].setValue(77);
      }
    }

    //создание пометки
    console.log('создание пометки');
    this.getFormsControlsItem(0)[0]=this.setFormArrayWithNineControls([null,null,3,null,null,null,null,null,null,]);
    console.log('this.getFormsControlsItem(0)[0]: ',this.getFormsControlsItem(0)[0]);
    // (this.getFormsControlsItem(0)[0]as FormArray).controls[3].setValue(5);
    // this.getFormsArray(this.getFormsControlsItem(0)[0])[0].setValue(5);
    console.log('-----------------------');
    console.log('this.form',this.form);

    
    // запись/сохраение
    const saveArr=[[],[],[],[],[],[],[],[],[]];
    console.log('START saveArr: ',saveArr);
    for(let i=0;i<9;i++){
      for(let j=0;j<9;j++){
        saveArr[i][j]= this.getFormsControlsItem(i)[j].value;
      }
    }
    console.log('END saveArr: ',saveArr);
  }


  // async presentPopover(e: Event) {
  //   const popover = await this.popoverController.create({
  //     component: GamepadComponent,
  //     event: e,
  //   });

  //   await popover.present();

  //   const { role } = await popover.onDidDismiss();
  //   // this.roleMsg = `Popover dismissed with role: ${role}`;
  // }

  public arrayNumber= [1,2,3,4,5,6,7,8,9];

  // async presentAlert() {
  //   const buttons:AlertButton[]=this.arrayNumber.map(item=>({
  //     text: `${item}`,
  //     // role: 'cancel',
  //     handler: () => {
  //       console.log('handler');
  //       this.setValue(item);
  //       // this.handlerMessage = 'Alert canceled';
  //     },
  //   }));

  //   const alert = await this.alertController.create({
  //     header: 'Alert!',
  //     buttons: buttons,
  //   });

  //   await alert.present();

  //   // const { role } = await alert.onDidDismiss();
  //   // this.roleMessage = `Dismissed with role: ${role}`;
  // }

  public clickButton(num):void{
    console.log('num: ',num);
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
    if(this.isNote){
      // заметка
      this.isNote=false;
      // this.note(index);
      const arr=(new Array(9)).fill(null);
      console.log('value: ',value);
      console.log('this.clickIndex[2]: ',this.clickIndex);
      arr[this.clickIndex[0]]=value;
      console.log('arr: ',arr);
      // [null,null,3,null,null,null,null,null,null,]
      // this.getFormsControlsItem(this.clickIndex[0])[this.clickIndex[1]]=this.setFormArrayWithNineControls(arr); 
      this.getFormsArray(this.getFormsArray()[this.clickIndex[0]])[this.clickIndex[1]]=this.setFormArrayWithNineControls(arr); 
      return;
    }else{
      if(this.clickIndex.length===3){
        console.log('delete length==3');
        // const item=this.getFormsControlsItem(this.clickIndex[0]);
        // [this.clickIndex[1]];
        // if(this.isControl(item)){
          
        // }


        // TODO: заменить вот это вот на отдельные функции для основного элемента и для заметки :)
        this.getFormsArray(this.getFormsArray(this.getFormsArray()[this.clickIndex[0]])[this.clickIndex[1]])[this.clickIndex[2]].setValue(value);
        // this.getFormsArray(item)[this.clickIndex[2]].setValue(value);
      }else{
        console.log('delete length!=3');
        // this.getFormsControlsItem(this.clickIndex[0])[this.clickIndex[1]].setValue(value);
        console.log('getFormsArray: ',this.getFormsArray(this.clickIndex[0]))
        this.getFormsArray(this.getFormsArray()[this.clickIndex[0]])[this.clickIndex[1]].setValue(value);
      }
    }
    this.clickIndex=[];
  }

  public clickField(index:number[],e=null){
    console.log('clickField index: ',index);
    // if(this.isNote){
    //   // заметка
    //   // this.isNote=false;
    //   // this.note(index);
    //   this.clickIndex=index;
    //   this.presentPopover(e);
    //   return;
    // }
    if(this.isDelete){
      // Удалить
      this.isDelete=false;
      this.delete(index);
      return;
    }
    if(this.isClue){
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
      console.log('delete length==3');
      // this.getFormsControlsItem(index[0])[index[1]][index[2]].setValue(null);
      this.getFormsArray(this.getFormsArray(this.getFormsArray()[index[0]])[index[1]])[index[2]].setValue(null)
    }else{
      console.log('delete length!=3');
      this.getFormsControlsItem(index[0])[index[1]].setValue(null);
    }

  }

  public clue(index:number[]):void{
    console.log('clue');
  }

  private setFormArrayWithNineControls(arrayValues:Array<number>=new Array(9)):FormArray{
    // console.log('arrayValues: ',arrayValues);
    const newArray=new FormArray([]);
    arrayValues.forEach((item,index)=>{
      // console.log('item:',item);
      (newArray as FormArray).push(new FormControl(item));
      (newArray as FormArray).controls[index].valueChanges.subscribe(value=>{
      })
    });
    return newArray;
  }

 public getFormsControlsSudoky() : AbstractControl[]{
    // console.log('getFormsControlsSudoky');
    return (this.form.controls.sudoky as FormArray)?.controls;
  }

  public getFormsControlsItem(index:number) : AbstractControl[]{
    // console.log('getFormsControlsItem index:',index);
    return (this.getFormsControlsSudoky()[index] as FormArray)?.controls;
  }

  public getFormsArray(item=null): AbstractControl[]{
    return (item?item:this.form.controls.sudoky as FormArray)?.controls;
  }

  public isControl(item:AbstractControl):boolean{
    return !(item instanceof FormArray);
  }
  
  public ngOnInit(){
    console.log('OnInit');
  }

  public ngOnDestroy(){
    console.log('ngOnDestroy');
  }

}

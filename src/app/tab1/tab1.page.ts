import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnDestroy,OnInit {

  //TODO: кадждая строчка отдельный массив
  // public array=[
  //   [1,2,3,4,5,6,7,8,9 ],
  //   [1,2,3,4,5,6,7,8,9 ],
  //   [1,2,3,4,5,6,7,8,9 ],
    
  //   [9,8,7,6,5,4,3,2,1],
  //   [9,8,7,6,5,4,3,2,1],
  //   [9,8,7,6,5,4,3,2,1],

  //   [1,1,1,1,1,1,1,1,1],
  //   [1,1,1,1,1,1,1,1,1],
  //   [1,1,1,1,1,1,1,1,1],
  // ]

  // form : FormGroup;
  // gamepad - компонент с кнопками
  //playing-field

  constructor(public popoverController: PopoverController) {
    // this.form = new FormGroup({
    //   "sudoky": new FormArray([
    //   ])
    // });

    // this.array.forEach((item,index)=>{
    //   (this.form.controls.sudoky as FormArray).push(this.setFormArrayWithNineControls(item));
      
    // })
    // console.log('array: ',this.form)
    // // заполнение
    // this.getFormsControlsItem(0)[0].setValue(77);
    // for(let i=0;i<9;i++){
    //   for(let j=0;j<9;j++){
    //     this.getFormsControlsItem(i)[j].setValue(77);
    //   }
    // }

    // //создание пометки
    // console.log('создание пометки');
    // this.getFormsControlsItem(0)[0]=this.setFormArrayWithNineControls([null,null,3,null,null,null,null,null,null,]);
    // console.log('this.getFormsControlsItem(0)[0]: ',this.getFormsControlsItem(0)[0]);
    // // (this.getFormsControlsItem(0)[0]as FormArray).controls[3].setValue(5);
    // // this.getFormsArray(this.getFormsControlsItem(0)[0])[0].setValue(5);
    // console.log('-----------------------');
    // console.log('this.form',this.form);

    
    // // запись/сохраение
    // const saveArr=[[],[],[],[],[],[],[],[],[]];
    // console.log('START saveArr: ',saveArr);
    // for(let i=0;i<9;i++){
    //   for(let j=0;j<9;j++){
    //     saveArr[i][j]= this.getFormsControlsItem(i)[j].value;
    //   }
    // }
    // console.log('END saveArr: ',saveArr);
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

  // setFormArrayWithNineControls(arrayValues:Array<number>=new Array(9)):FormArray{
  //   // console.log('arrayValues: ',arrayValues);
  //   const newArray=new FormArray([]);
  //   arrayValues.forEach((item,index)=>{
  //     // console.log('item:',item);
  //     (newArray as FormArray).push(new FormControl(item));
  //     (newArray as FormArray).controls[index].valueChanges.subscribe(value=>{
  //     })
  //   });
  //   return newArray;
  // }

  // getFormsControlsSudoky() : AbstractControl[]{
  //   // console.log('getFormsControlsSudoky');
  //   return (this.form.controls.sudoky as FormArray)?.controls;
  // }

  // getFormsControlsItem(index:number) : AbstractControl[]{
  //   // console.log('getFormsControlsItem index:',index);
  //   return (this.getFormsControlsSudoky()[index] as FormArray)?.controls;
  // }

  // getFormsArray(item): AbstractControl[]{
  //   return (item?item:this.form.controls.sudoky as FormArray)?.controls;
  // }

  // public isControl(item:AbstractControl):boolean{
  //   return !(item instanceof FormArray);
  // }
  
  public ngOnInit(){
    console.log('OnInit');
  }

  public ngOnDestroy(){
    console.log('ngOnDestroy');
  }

}

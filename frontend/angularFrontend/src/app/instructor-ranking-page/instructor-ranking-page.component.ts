import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {Router} from "@angular/router";

@Component({
  selector: 'app-instructor-ranking-page',
  templateUrl: './instructor-ranking-page.component.html',
  styleUrls: ['./instructor-ranking-page.component.css']
})
export class InstructorRankingPageComponent{

  constructor(public fb: FormBuilder, private router: Router) {}
  
  //original array of names
  names = ['John', 'Halston', 'Rio', 'Xavier'];

  //goes back to 
  navigateToInstructorHome(){
    this.router.navigate(['instructor']);
  }

  //drag and drop functionalities
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.names, event.previousIndex, event.currentIndex);
  }

  sub(event: CdkDragDrop<string[]>){
    alert(this.names);
    this.disableChanges();
  }

  //only enable submit button if confirmation check box is selected
  checkboxes = [{label: 'I understand that this ranking may only be submit once.', state:''}];
  
  buttonState() {
    return !this.checkboxes.some(_ => _.state);
  }

  //remove ranking system upon submit
  public show:boolean = true;
  public show2:boolean = false;
  public buttonName:any = 'Submit';

  disableChanges() {
    this.show = !this.show;
    this.show2 = !this.show2

    if(this.show)  
      this.buttonName = "hide";
    else
      this.buttonName = "show";
  }
}

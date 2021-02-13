import { Component, Input } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {Router} from "@angular/router";
import { OnInit } from '@angular/core';
import { HiringEventService } from "../hiring-event.service";
@Component({
  selector: 'app-instructor-ranking-page',
  templateUrl: './instructor-ranking-page.component.html',
  styleUrls: ['./instructor-ranking-page.component.css']
})
export class InstructorRankingPageComponent implements OnInit{

  constructor(public fb: FormBuilder, private router: Router, private hiringEventService: HiringEventService) {}

  numbers: any;
  events: any;
  applicantResponses = [];

  @Input() currentResponses: any;
  @Input() currentCourse: any;


  ngOnInit(): void {
    this.applicantResponses = this.currentCourse.applicantResponses;
    this.numbers = [];
    this.counter();
    //console.log(this.applicantResponses)
    console.log(this.currentCourse, "is the course")

    this.hiringEventService.getEvent(this.currentCourse).subscribe(element =>{
      console.log(element, "is the elemnt")
    })


  }


  //goes back to
  navigateToInstructorHome(){
    this.router.navigate(['instructor']);
  };

  //counter for number display next to rating scale
  counter(){
    for(let i = 0; i < this.applicantResponses.length; i++){
      this.numbers.push(i+1);
    }
  }

  //drag and drop functionalities
  drop(event: CdkDragDrop<string[]>) {

    moveItemInArray(this.applicantResponses, event.previousIndex, event.currentIndex);
  }

  //submission of ranking function
  submit(event: CdkDragDrop<string[]>){

    const adminRankingAr =[];

    for(let n=0; n< this.applicantResponses.length; n++){
      this.applicantResponses[n].instructorRank = n+1;
      console.log(this.applicantResponses[n])

      this.applicantResponses[n].adminRanking = n+1;
    }


    this.hiringEventService.updateRanking(this.currentCourse._id, this.applicantResponses).subscribe(response=>{
      console.log(response, "UPDATE SUCCESSFULLY")
    })
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

  disableChanges() {
    this.show = !this.show;
    this.show2 = !this.show2
  }

  //hide display of applications until view button is clicked
  public view:boolean = false;
  public viewButton:any = 'Hide';

  displayApp(){
    this.view = !this.view;

    if(this.view)
      this.viewButton = "Hide Application";
    else
      this.viewButton = "View Previous";
  }

  //found application from searching
  foundApp: any;

  findApp(name){

    //empty application object
    this.foundApp = [{
      foundName: "",
      foundEmail: "",
      foundResponses: []
    }];

    //load found object details into empty object
    for(let i = 0; i < this.applicantResponses.length; i++){
      if(name == this.applicantResponses[i].applicantName){
        this.foundApp[0].foundName = this.applicantResponses[i].applicantName;
        this.foundApp[0].foundEmail = this.applicantResponses[i].applicantEmail;
        for(let j = 0; j < this.applicantResponses[i].responses.length; j++){
          let ob = {foundQuestion: "", foundAnswer: ""};
          ob.foundQuestion = this.applicantResponses[i].responses[j].question;
          ob.foundAnswer = this.applicantResponses[i].responses[j].answer;
          this.foundApp[0].foundResponses.push(ob);
        }
      }
    }

    //call display function to make the display visible
    this.displayApp();
  }
}

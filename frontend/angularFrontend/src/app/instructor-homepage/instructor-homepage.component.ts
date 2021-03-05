import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ApplicationService} from '../application.service';
import { FormBuilder } from "@angular/forms";
import {FormArray, FormControl, FormGroup} from '@angular/forms';
import { HiringEventService } from "../hiring-event.service";

@Component({
  selector: 'app-instructor-homepage',
  templateUrl: './instructor-homepage.component.html',
  styleUrls: ['./instructor-homepage.component.css']
})
export class InstructorHomepageComponent implements OnInit {
  courseCode;
  handleCourseCode(term: string): void {this.courseCode = term.replace(/[<={}()>/\\]/gi, "")}

  //sample data
//used to store array of courses
  assignedTAs :any = [];
  visibility = "hidden";
  taVisibility = "hidden";
  user = "Prof. K. Grolinger";

  evQuestions:any;

  //dynamic reactive forms
  evaluationForm = new FormGroup({
    questions: new FormArray([
      //placeholders
    ]),
  });

  //gets the array of questions from the reactive form
  get questions(): FormArray {
    return this.evaluationForm.get('questions') as FormArray;
  }

   // for adding a new question input 
   addQuestion() {
    console.log("new question added");
    //this.questions.push(this.fb.control(""));
    this.questions.push(new FormControl());
  }


  events: any;

  constructor(private router: Router,
    private appService: ApplicationService,
    private hiringEventService:HiringEventService) { }

  ngOnInit(): void {
    this.hiringEventService.getAllEvents().subscribe(events =>{
      console.log(events);
      this.events = events
    })
  }

  //Navigating to the applicant page
  logOut(){
    this.router.navigate(['login']);
  }

  //Navigating to the applicant page
  viewCourse(course){
    this.router.navigate(['course'], {state: {data: {currentCourse:course}}});
  }



 

  //Navigating to the applicant page
  navigateToApplicants(){
    this.router.navigate(['instructor-ranking']);
  }

 //toggles div visibility to allow users to create
  createEval(){
    this.visibility = "visible";
  }

  //shows popup with assigned TAs
  viewAssigned(){
    this.taVisibility = "visible";
  }


  createHiringEvent(){

    this.hiringEventService.createEvent(this.courseCode).subscribe(event=>{
      console.log(event, "created!!")
    })

  }

  save(){
    // displays array of questions
    //console.log(this.questions.value);  
    // displays object containing array of questions
    //console.log(this.evaluationForm.value);
 
  };

  submitResponse(){
    console.log(this.questions.value);  
    this.evQuestions = this.questions.value;
    this.appService.saveQuestions(this.evQuestions).subscribe(response=>{
    console.log(response);

    });
    
  }

  

  close(){
    this.visibility = "hidden";
    this.taVisibility = "hidden";
  }

}


// <button type="submit " [disabled]="!evaluationForm.valid ">Save</button>
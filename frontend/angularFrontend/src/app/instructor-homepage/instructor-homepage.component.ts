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
  suggestedTAs :any = [];
  customAssignment: any = [];
  visibility = "hidden";
  taVisibility = "hidden";
  customVisibility = "hidden";
  user = "Prof. K. Grolinger";

  evQuestions:any;

  //dynamic reactive forms
  evaluationForm = new FormGroup({
    questions: new FormArray([
      //placeholders
    ]),
  });

  //Admin and Chair Functionality
  taForm = new FormGroup({
    customTA: new FormArray([
      //placeholders
    ]),
  });
  get customTA(): FormArray {
    return this.taForm.get('customTA') as FormArray;
  }
  // for adding new TA to assignment
  addTA() {
    console.log("new TA added");
    this.customTA.push(new FormControl());
  }
  

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
 
  //this is related to a chair and admin functionality
  createAssignment(){
    this.customVisibility="visible";
  }
  saveTA(){
    console.log(this.customTA.value);  
    this.evQuestions = this.questions.value;
    //this.appService.saveQuestions(this.evQuestions).subscribe(response=>{
    //console.log(response);
    //});
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

    this.hiringEventService.createEvent(this.courseCode, "6022e3cf3e66f36b08f0ca35").subscribe(event=>{
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
    this.customVisibility = "hidden";
  }

}

// <button type="submit " [disabled]="!evaluationForm.valid ">Save</button>
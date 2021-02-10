import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ApplicationService} from '../application.service';
import { FormBuilder } from "@angular/forms";
import { FormArray } from "@angular/forms";
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

  //reactive form that will be used to obtain information from users
  evaluationForm = this.fb.group({
    questions: this.fb.array([this.fb.control("")])
  });

  //gets the array of questions from the reactive form
  get questions() {
    return this.evaluationForm.get("questions") as FormArray;
  }
  events: any;

  constructor(private router: Router,
    private appService: ApplicationService,
    private fb: FormBuilder,
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



  //
  addQuestion() {
    console.log("new question added");
    this.questions.push(this.fb.control(""));
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
    //obtains all the input values and sends them to the database
    console.log(this.questions.value);
    //this.visibility = "hidden";
  }

  close(){
    this.visibility = "hidden";
    this.taVisibility = "hidden";
  }

}

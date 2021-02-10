import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {ApplicationService} from '../application.service';
import { FormBuilder } from "@angular/forms";
import { FormArray } from "@angular/forms";

@Component({
  selector: 'app-instructor-homepage',
  templateUrl: './instructor-homepage.component.html',
  styleUrls: ['./instructor-homepage.component.css']
})
export class InstructorHomepageComponent implements OnInit {

  //sample data
  courses : any = [{
        courseCode: "SE2250: Software Construction" ,
        instructorID: "Prof. K. Grolinger",
        facultyID: null,
        startDate: Date.now(),
        endDate: null,
        status: "questionsPending",
        questionFile: null,
        applicantResponses: [{
            applicantName: null,
            applicantEmail: null,
            rank: null,
            responses: [{
                question: null,
                answer: null,
            }],
        }]

  }];//used to store array of courses
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

  constructor(private router: Router, private appService: ApplicationService, private fb: FormBuilder) { }

  ngOnInit(): void {
    
  }

  //Navigating to the applicant page
  logOut(){
    this.router.navigate(['login']);
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

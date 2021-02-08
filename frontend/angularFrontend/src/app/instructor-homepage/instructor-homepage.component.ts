import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-instructor-homepage',
  templateUrl: './instructor-homepage.component.html',
  styleUrls: ['./instructor-homepage.component.css']
})
export class InstructorHomepageComponent implements OnInit {

  courses : any =[];//used to store array of courses
  user = "Prof. K. Grolinger";

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.courses[0] = "SE2250: Software Construction"
  }

  //Navigating to the applicant page
  logOut(){
    this.router.navigate(['login']);
  }

  //Navigating to the applicant page
  navigateToApplicants(){
    this.router.navigate(['instructor-ranking']);
  }

  createEval(){
    //toggles div visibility to allow users to create 
  }

  viewAssigned(){
    //shows popup with assigned TAs
  }

  newQuestion(){
    //dynamically adds new input fields
    //only if the fields available are already full
  }

  save(){
    //obtains all the input values and sends them to the database
  }

  close(){
    //closes the pop up
  }

}

import { state } from '@angular/animations';
import { Component, OnInit,Input } from '@angular/core';
import {StateService} from "../state.service";
import {CourseService} from "../course.service";

@Component({
  selector: 'app-course-view-page',
  templateUrl: './course-view-page.component.html',
  styleUrls: ['./course-view-page.component.css']
})
export class CourseViewPageComponent implements OnInit {
  currentCourse;


  constructor(private stateService:StateService) {
  }

  ngOnInit(): void {
    this.currentCourse = this.stateService.getCurrentCourse()
    console.log("current course",  this.stateService.getCurrentCourse())
this.currentCourse =  {applicantResponses:  [
 {courseCode: "SE123", applicantName: "Alice", applicantEmail: "alice@uwo.ca", instructorRank: null, applicantRank: null},
{courseCode: "SE123", applicantName: "Bob", applicantEmail: "bob@uwo.ca", instructorRank: null, applicantRank: null},
 {courseCode: "SE123", applicantName: "Charles", applicantEmail: "charles@uwo.ca", instructorRank: null, applicantRank: null}
],
    courseCode: "SE123",
    createdAt: "2021-03-06T01:33:23.426Z",
    hiringEventID: "603eb9299195d0d7707675ad",
    instructorID: null,
    questionFile: [],
    rankingFile: null,
    requiredHours: 13,
    status: "created",
    updatedAt: "2021-03-06T02:23:33.122Z",
    __v: 0,
    _id: "6042dbe36c43d03958b969d8"}
    //this.currentCourse = history.state.data.currentCourse;
  }



}

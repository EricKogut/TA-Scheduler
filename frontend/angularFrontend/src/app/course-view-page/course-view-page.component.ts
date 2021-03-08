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
  numbers: any;
  events: any;
  applicantResponses = [];
   //sample data
  //used to store array of courses
  suggestedTAs :any = [];
  customAssignment: any = [];
  currentMatches = [];


  constructor(private stateService:StateService,
              private courseService: CourseService) {
  }

  ngOnInit(): void {
    this.currentCourse = this.stateService.getCurrentCourse()
    console.log("current course",  this.stateService.getCurrentCourse())
// this.currentCourse =  {applicantResponses:  [
//  {courseCode: "SE123", applicantName: "Alice", applicantEmail: "alice@uwo.ca", instructorRank: null, applicantRank: null, responses:[{question: "Know Java?", answer: "yes"}, {question: "Know OOP?", answer: "No"},
// {question: "Teaching Certificate?", answer: "No answer Provided"}]},
// {courseCode: "SE123", applicantName: "Bob", applicantEmail: "bob@uwo.ca", instructorRank: null, applicantRank: null},
//  {courseCode: "SE123", applicantName: "Charles", applicantEmail: "charles@uwo.ca", instructorRank: null, applicantRank: null}
// ],
//     courseCode: "SE123",
//     createdAt: "2021-03-06T01:33:23.426Z",
//     hiringEventID: "603eb9299195d0d7707675ad",
//     instructorID: null,
//     questionFile: [],
//     rankingFile: null,
//     requiredHours: 13,
//     status: "created",
//     updatedAt: "2021-03-06T02:23:33.122Z",
//     __v: 0,
//     _id: "6042dbe36c43d03958b969d8"}
//     //this.currentCourse = history.state.data.currentCourse;
  }




  //shows popup with assigned TAs
  viewAssigned(course){
    this.courseService.getMatches(this.currentCourse.courseCode).subscribe(event=>{
      let tas = event as Array<any>
      for(let ta of tas){
        if(ta.status == "pending"){
          console.log(ta.name)
          this.suggestedTAs.push(ta.name)

        }
      }
      console.log(this.suggestedTAs, "are the suggested TAs")
    })
  }

  reject(data){
    console.log(data)
    this.courseService.rejectMatch(data, this.currentCourse.courseCode).subscribe(event=>{
      console.log(event, "nyeaheh")
    })
  }


  confirm(data){
    console.log(data)
    this.courseService.confirmMatch(data, this.currentCourse.courseCode).subscribe(event=>{
      console.log(event, "nyeaheh")
    })
  }

}

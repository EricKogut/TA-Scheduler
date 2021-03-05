import { Component, OnInit } from '@angular/core';
import {StateService} from "../state.service";
import {CourseService} from "../course.service";
@Component({
  selector: 'app-hiring-event-home',
  templateUrl: './hiring-event-home.component.html',
  styleUrls: ['./hiring-event-home.component.css']
})
export class HiringEventHomeComponent implements OnInit {
  currentHiringEvent= this.stateService.getCurrentHiringEvent();
  courseCode;
  courses;
  handleCourseCode(term: string): void {this.courseCode = term.replace(/[<={}()>/\\]/gi, "")}

  constructor(private stateService:StateService,
              private courseService:CourseService) { }

  ngOnInit(): void {
    this.currentHiringEvent= this.stateService.getCurrentHiringEvent();
    console.log(this.currentHiringEvent, "is the current hiring event")
    this.getCourses();
  }

  getCourses(){
    let id =  this.stateService.getCurrentHiringEvent()._id;
    this.courseService.getHiringEventCourses(id).subscribe(courses=>{
      this.courses=courses;
      console.log(courses," are the courses")

    })
  }

  addNewCourse(){
    this.courseService.createNewCourse(this.courseCode, this.currentHiringEvent._id).subscribe(courses=>{
      console.log(courses," are the courses")
      this.getCourses();
    })

  }


  Upload(){
    console.log("yes you are here!");
  }

  navigateToCourse(course){

  }
}

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
    //this.currentCourse = history.state.data.currentCourse;
  }



}

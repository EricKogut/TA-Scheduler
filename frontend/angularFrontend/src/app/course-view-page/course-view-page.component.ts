import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-course-view-page',
  templateUrl: './course-view-page.component.html',
  styleUrls: ['./course-view-page.component.css']
})
export class CourseViewPageComponent implements OnInit {




  currentCourse;




  constructor() {
  }

  ngOnInit(): void {
    console.log(history.state.data.currentCourse, "is the current state")
    this.currentCourse = history.state.data.currentCourse;
  }

}

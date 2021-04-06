import { Component, OnInit } from '@angular/core';
import { CourseService } from '../course.service';
import { StateService } from '../state.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-instructor-courses',
  templateUrl: './instructor-courses.component.html',
  styleUrls: ['./instructor-courses.component.css']
})
export class InstructorCoursesComponent implements OnInit {
  courses;

  constructor(private courseService: CourseService, private router: Router, private stateService: StateService,) { }

  ngOnInit(): void {
    this.getCourses();
  }


  getCourses() {
    
    this.courseService.getInstructorCourses(localStorage.getItem("_id")).subscribe((courses) => {
      this.courses = courses;
      console.log(courses, 'hereeeeeeee')
    });
  }

  navigateToCourse(course) {
    this.stateService.setCurrentCourse(course);
    this.router.navigate(['course']);
  }

}

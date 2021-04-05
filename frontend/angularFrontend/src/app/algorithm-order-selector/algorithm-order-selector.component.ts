import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HiringEventService } from '../hiring-event.service';
import { CourseService } from "../course.service";


@Component({
  selector: 'app-algorithm-order-selector',
  templateUrl: './algorithm-order-selector.component.html',
  styleUrls: ['./algorithm-order-selector.component.css']
})
export class AlgorithmOrderSelectorComponent {

  @Input() currentCourse;
  isSubmitted = false;
  constructor(private hiringEventService: HiringEventService,
    private courseService: CourseService) { }

  runAlgorithm(myForm: NgForm) {
    this.isSubmitted = true;
    if (!myForm.valid) {
      return false;
    } else {
      alert(JSON.stringify("Preference updated"));
      this.courseService.updatePriority(this.currentCourse._id, myForm.value.order).subscribe(course => {
        this.currentCourse = course;
      })
    }
  }
}

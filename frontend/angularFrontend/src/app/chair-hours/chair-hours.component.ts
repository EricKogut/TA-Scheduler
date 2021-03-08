import { Component, Input, OnInit } from '@angular/core';
import { HiringEventService } from '../hiring-event.service';
import { CourseService } from '../course.service';
import { StateService } from '../state.service';

@Component({
  selector: 'app-chair-hours',
  templateUrl: './chair-hours.component.html',
  styleUrls: ['./chair-hours.component.css']
})
export class ChairHoursComponent implements OnInit{
  @Input() currentCourse: any;
  currentHiringEvent;

  constructor(private courseService:CourseService, private stateService: StateService) { }
  ngOnInit(): void {
    this.currentHiringEvent = this.stateService.getCurrentHiringEvent();
     }

  //visibility for the hours modification form
  visibility = "hidden";
  taHours: number;

  //change the TA hours submission button
  submitResponse(newHours){
    //updates the local hours variable
    this.taHours = newHours;
    console.log(this.taHours);

    // this.hiringEventService.modifyTaHours(this.currentCourse._id, newHours).subscribe(response=>{
    //   console.log(response, "TA HOURS UPDATED")

    // });

    //changes visibility of form to close
    this.close();
  }

  //changes visibility of form to display
  changeHours(){
    this.visibility = "visible";
  }

  //changes visibility of form to close
  close(){
    this.visibility = "hidden";
  }
}

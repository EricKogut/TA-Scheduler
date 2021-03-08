import { Component, Input, OnInit } from '@angular/core';
import { HiringEventService } from '../hiring-event.service';

@Component({
  selector: 'app-chair-hours',
  templateUrl: './chair-hours.component.html',
  styleUrls: ['./chair-hours.component.css']
})
export class ChairHoursComponent implements OnInit{
  @Input() currentCourse: any;

  constructor(private hiringEventService:HiringEventService) { }
  ngOnInit(): void {
    this.hiringEventService.getTaHours("33").subscribe(response=>{
      console.log(response, "TA HOURS UPDATED")

      this.taHours = response[0].enrollmentFile[0].TA_hour;
    });  }

  //visibility for the hours modification form
  visibility = "hidden";
  taHours: number;

  //change the TA hours submission button
  submitResponse(newHours){
    //updates the local hours variable
    this.taHours = newHours;
    console.log(this.taHours);

    this.hiringEventService.modifyTaHours("ECE 2231B", newHours).subscribe(response=>{
      console.log(response, "TA HOURS UPDATED")

      this.taHours = response[0].enrollmentFile[0].TA_hour;
    });

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

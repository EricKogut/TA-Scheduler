import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-chair-hours',
  templateUrl: './chair-hours.component.html',
  styleUrls: ['./chair-hours.component.css']
})
export class ChairHoursComponent {
  hiringEventService: any;
  @Input() currentCourse: any;

  constructor() { }

  //visibility for the hours modification form
  visibility = "hidden";
  taHours: number = 10;

  //change the TA hours submission button
  submitResponse(newHours){
    //updates the local hours variable
    this.taHours = newHours;
    console.log(this.taHours);

    //changes visibility of form to close
    this.close();

    //sends new hours to backend
    this.hiringEventService.updateHours(this.currentCourse._id, this.taHours).subscribe(response=>{
      console.log(response, "TA HOURS UPDATED")
    })

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

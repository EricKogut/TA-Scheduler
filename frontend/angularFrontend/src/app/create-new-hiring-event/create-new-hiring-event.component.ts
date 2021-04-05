import { Component, OnInit } from '@angular/core';
import * as introJs from 'intro.js/intro.js';
import { HiringEventService } from "../hiring-event.service";
import { StateService } from "../state.service";
import { Router } from "@angular/router"

@Component({
  selector: 'app-create-new-hiring-event',
  templateUrl: './create-new-hiring-event.component.html',
  styleUrls: ['./create-new-hiring-event.component.css']
})
export class CreateNewHiringEventComponent implements OnInit {
  introJS = introJs();

  constructor(private hiringEventService: HiringEventService,
    private stateService: StateService,
    private router: Router) {

    this.introJS.setOptions({
      steps: [
        {
          intro: "Welcome to your new Hiring Event"
        },
        {
          element: '#step1',
          intro: "This is the name of your event. It doesn't really matter what its called, this is more so for you"
        },
        {
          element: '#step2',
          intro: "These will be all the courses that you have currently created",
          position: 'right'
        },
        {
          element: '#step3',
          intro: 'Once you have the applicant response file upload it here. ',
          position: 'left'
        },
        {
          element: '#step4',
          intro: "If you have a file available with any previous enrollment information upload it here",
          position: 'bottom'
        },
        {
          element: '#step5',
          intro: 'Contact hello@courseMatcher.com with any questions :)'
        }
      ]
    });
  }

  ngOnInit() {
    this.introJS.start();
  }

  createNewHiringEvent() {
    this.hiringEventService.createEvent(localStorage.getItem("_id")).subscribe(element => {
      console.log(element);
      console.log("created new hiring event")

      this.stateService.setCurrentHiringEvent(element);
    })
    this.router.navigate(['landing'])

  }

}

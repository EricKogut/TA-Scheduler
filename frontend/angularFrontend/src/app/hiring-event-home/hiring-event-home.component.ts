import { Component, OnInit } from '@angular/core';
import {StateService} from "../state.service";

@Component({
  selector: 'app-hiring-event-home',
  templateUrl: './hiring-event-home.component.html',
  styleUrls: ['./hiring-event-home.component.css']
})
export class HiringEventHomeComponent implements OnInit {
  currentHiringEvent;

  constructor(private stateService:StateService) { }

  ngOnInit(): void {
    this.currentHiringEvent= this.stateService.getCurrentHiringEvent();
  }


  Upload(){
    console.log("yes you are here!");
  }

}

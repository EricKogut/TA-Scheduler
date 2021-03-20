import { Component, OnInit } from '@angular/core';
import { HiringEventService } from '../hiring-event.service';
import { StateService } from '../state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hiring-events-page',
  templateUrl: './hiring-events-page.component.html',
  styleUrls: ['./hiring-events-page.component.css'],
})
export class HiringEventsPageComponent implements OnInit {
  role;
  currentHiringEvents;

  constructor(
    private hiringEventService: HiringEventService,
    private stateService: StateService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getRole();
    this.getUserHiringEvents();
  }

  getRole() {
    this.role = localStorage.getItem('role');
  }

  getUserHiringEvents() {
    this.hiringEventService
      .getUserEvents(localStorage.getItem('_id'))
      .subscribe((events) => {
        this.currentHiringEvents = events;
        console.log(events, 'are the events');
      });
  }

  navigateToEvent(event) {
    this.stateService.setCurrentHiringEvent(event);

    this.router.navigate(['hiringEventHome']);
  }
}

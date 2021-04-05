import { Component, OnInit } from '@angular/core';
import { HiringEventService } from '../hiring-event.service';
import { StateService } from '../state.service';
import { Router } from '@angular/router';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-hiring-events-page',
  templateUrl: './hiring-events-page.component.html',
  styleUrls: ['./hiring-events-page.component.css'],
})
export class HiringEventsPageComponent implements OnInit {
  role;
  currentHiringEvents;

  closeResult = '';
  constructor(
    private hiringEventService: HiringEventService,
    private stateService: StateService,
    private router: Router,
    private modalService: NgbModal
  ) { }


  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  createNewHiringEvent() {
    this.hiringEventService.createEvent(localStorage.getItem("_id")).subscribe(element => {
      console.log(element);
      console.log("created new hiring event")

      this.stateService.setCurrentHiringEvent(element);
    })
    this.router.navigate(['landing'])

  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }



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

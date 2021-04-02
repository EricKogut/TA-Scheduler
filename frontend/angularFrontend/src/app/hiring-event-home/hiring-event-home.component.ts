import { Component, OnInit } from '@angular/core';
import { StateService } from '../state.service';
import { CourseService } from '../course.service';
import { HiringEventService } from '../hiring-event.service';
import { Router } from '@angular/router';
import { MatSelectionListBase } from '@angular/material';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-hiring-event-home',
  templateUrl: './hiring-event-home.component.html',
  styleUrls: ['./hiring-event-home.component.css'],
})
export class HiringEventHomeComponent implements OnInit {
  role;
  currentHiringEvent = this.stateService.getCurrentHiringEvent();
  courseCode;
  courses;
  notificationMessage: any;
  senderEmail: any;
  receiverEmail: any;
  receiverRole: any;
  handleCourseCode(term: string): void {
    this.courseCode = term.replace(/[<={}()>/\\]/gi, '');
  }

  constructor(
    private stateService: StateService,
    private courseService: CourseService,
    private hiringEventService: HiringEventService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getRole();
    this.currentHiringEvent = this.stateService.getCurrentHiringEvent();
    console.log(this.currentHiringEvent, 'is the current hiring event');
    this.getCourses();
  }

  getRole() {
    this.role = localStorage.getItem('role');
  }

  getCourses() {
    let id = this.stateService.getCurrentHiringEvent()._id;
    this.courseService.getHiringEventCourses(id).subscribe((courses) => {
      this.courses = courses;
      console.log(courses, ' are the courses');
    });
  }

  addNewCourse() {
    this.courseService
      .createNewCourse(this.courseCode, this.currentHiringEvent._id)
      .subscribe((courses) => {
        console.log(courses, ' are the courses');
        this.getCourses();
      });
  }

  updateCourses() {
    console.log('updateing', this.stateService.getCurrentHiringEvent());
    this.currentHiringEvent = this.stateService.getCurrentHiringEvent();
    this.courseService
      .updateCourses(
        this.currentHiringEvent._id,
        this.stateService.getCurrentHiringEvent().answerFile
      )
      .subscribe((event) => {
        console.log('event updated!');
      });
    this.courseService
      .updateRequiredHours(
        this.currentHiringEvent._id,
        this.stateService.getCurrentHiringEvent().enrollmentFile
      )
      .subscribe((event) => {
        console.log('event updated!');
      });
  }

  downloadFile() {
    this.hiringEventService
      .getAllQuestions(this.currentHiringEvent._id)
      .subscribe((questions) => {
        console.log(questions, 'are the questions');
        let data = [[]];
        questions.forEach((course) => {
          data[0].push(course.courseCode);
          data.push(course.questionFile);
        });
        const replacer = (key, value) => (value === null ? '' : value); // specify how you want to handle null values here
        const header = Object.keys(data[0]);
        let csv = data.map((row) =>
          header
            .map((fieldName) => JSON.stringify(row[fieldName], replacer))
            .join(',')
        );
        csv.unshift(header.join(','));
        let csvArray = csv.join('\r\n');

        var blob = new Blob([csvArray], { type: 'text/csv' });
        saveAs(blob, 'myFile.csv');
      });
  }

  Upload() {
    console.log('yes you are here!');
  }

  navigateToCourse(course) {
    this.stateService.setCurrentCourse(course);
    this.router.navigate(['course']);
  }

  createMatches() {
    //STEP #1
    //Get all courses that are within this hiring event
    this.courseService
      .getHiringEventCourses(this.currentHiringEvent._id)
      .subscribe((courses) => {
        courses.forEach((course) => {
          //STEP #2
          //Parse data to make it easier to work with
          let currentRequiredHours = course.requiredHours;
          //Applicants type 1, 2 and 3
          var secondPriorityApplicants = [];
          var thirdPriorityApplicants = [];
          var firstPriorityApplicants = [];

          course.applicantResponses.forEach((response) => {
            if (response.applicantStatus == 0) {
            } else if (response.applicantStatus == 1) {
              //keep this, dunno why it doesnt work
              while (firstPriorityApplicants.length == 0)
                [firstPriorityApplicants.push(Object.assign({}, response))];
            } else if (response.applicantStatus == 2) {
              secondPriorityApplicants.push(response);
            } else if (response.applicantStatus == 3) {
              thirdPriorityApplicants.push(response);
            }
          });

          //STEP#3
          //Now we have arrays for each priority of applicant
          //Now sort according to applicant/prof
          if (course.priority == 'applicant') {
            firstPriorityApplicants.sort(sortByApplicant);
            secondPriorityApplicants.sort(sortByApplicant);
            thirdPriorityApplicants.sort(sortByApplicant);
          } else {
            firstPriorityApplicants.sort(sortByInstructor);
            secondPriorityApplicants.sort(sortByInstructor);
            thirdPriorityApplicants.sort(sortByInstructor);
          }

          //All arrays are now sorted by the respective toggle values
          //NOTE: they are sorted so the BEST applicant is LAST (easier to pop)

          //STEP#4
          //Create matches on a course by course basis until all the hour requirements are filled
          //
          let hoursFilled = 0;
          let noMoreApplicants = false;

          //Storing all the matches for the current course
          let currentMatches = {};
          var currentMatch = {
            courseID: course._id,
            hiringEventID: this.currentHiringEvent._id,
            hoursFilled: 0,
            applicants: [],
          };
          currentMatch.applicants = [];

          //while we have not filled the required hours and there are applicants
          while (hoursFilled < currentRequiredHours && !noMoreApplicants) {
            let currentApplicant;
            //Check to see if there are applicants remaining
            if (
              firstPriorityApplicants.length == 0 &&
              secondPriorityApplicants.length == 0 &&
              thirdPriorityApplicants.length == 0
            ) {
              noMoreApplicants = true;
              break;
            } else {
              if (firstPriorityApplicants.length != 0) {
                currentApplicant = firstPriorityApplicants.pop();
                hoursFilled += currentApplicant.hours;
              } else if (secondPriorityApplicants.length != 0) {
                currentApplicant = secondPriorityApplicants.pop();
                hoursFilled += currentApplicant.hours;
              } else if (thirdPriorityApplicants.length != 0) {
                currentApplicant = thirdPriorityApplicants.pop();
                hoursFilled += currentApplicant.hours;
              }

              currentMatch.applicants.push({
                applicantName: currentApplicant.applicantName,
                applicantEmail: currentApplicant.applicantEmail,
                priority: currentApplicant.applicantStatus,
                hours: currentApplicant.hours,
                status: 'accepted',
              });
            }

            currentMatch.hoursFilled = hoursFilled;
          }
          console.log(currentMatch, 'is the current match');
          this.hiringEventService.addMatch(currentMatch).subscribe((match) => {
            console.log('Match successfully added!');
          });
        });
      });
    //notifying instructor that the TA allocation has been done
    this.notifyInstructor();
    //STEP#5
    //Show suggested matches row
  }
  notifyInstructor() {
    this.senderEmail = 'sanah@yahoo.com';
    this.receiverEmail = 'arsh.lalani@akahyd.org';
    this.receiverRole = 'instructor';
    this.notificationMessage = "The TA's have been successfully allocated!";

    // call the notification api route
    this.courseService
      .notifyUser(
        this.notificationMessage,
        this.senderEmail,
        this.receiverEmail,
        this.receiverRole
      )
      .subscribe((response) => {
        console.log('Notification Sent Successfully');
        console.log(response);
      });
  }
}
function sortByApplicant(a, b) {
  if (a.applicantRank < b.applicantRank) {
    return -1;
  }
  if (a.applicantRank > b.applicantRank) {
    return 1;
  }
  return 0;
}

function sortByInstructor(a, b) {
  if (a.instructorRank < b.instructorRank) {
    return -1;
  }
  if (a.instructorRank > b.instructorRank) {
    return 1;
  }
  return 0;
}

import { state } from '@angular/animations';
import { Component, OnInit, Input } from '@angular/core';
import { StateService } from '../state.service';
import { CourseService } from '../course.service';
import { HiringEventService } from '../hiring-event.service';
import { FormBuilder, FormArray, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { isConstructorDeclaration } from 'typescript';

@Component({
  selector: 'app-course-view-page',
  templateUrl: './course-view-page.component.html',
  styleUrls: ['./course-view-page.component.css'],
})
export class CourseViewPageComponent implements OnInit {
  role;
  validInstructor;
  currentCourse;
  numbers: any;
  events: any;
  applicantResponses = [];
  //sample data
  //used to store array of courses
  suggestedTAs: any = [];
  customAssignment: any = [];
  currentMatches: any = [];
  editingHours = false;
  addTA = false;
  createQuestions = false;
  notificationMessage: any;
  senderEmail: any;
  receiverEmail: any;
  receiverRole: any;
  hasInstructor = false;
  instructors = [];

  courseName: any;
  lecHours: any;
  ltHours: any;
  noSections: any;

  checkoutForm = this.formBuilder.group({
    applicantName: '',
    applicantEmail: '',
    hours: 0,
  });

  //dynamic reactive forms
  evaluationForm = new FormGroup({
    questions: new FormArray([
      //placeholders
    ]),
  });

  constructor(
    private stateService: StateService,
    private courseService: CourseService,
    private hiringEventService: HiringEventService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getRole();
    this.currentCourse = this.stateService.getCurrentCourse();

    if(this.currentCourse.instructorID === localStorage.getItem('_id')){
      this.validInstructor = true
    }
    else{
      this.validInstructor = false
    }



    if (this.currentCourse.instructorID != null){
      this.hasInstructor =true;
    }

    this.getMatches();
    this.findCourseInfo();
    this.hiringEventService.getInstructors(this.currentCourse.hiringEventID).subscribe(users=>{
      this.instructors = users;

    })
    // this.currentCourse =  {applicantResponses:  [
    //  {courseCode: "SE123", applicantName: "Alice", applicantEmail: "alice@uwo.ca", instructorRank: null, applicantRank: null, responses:[{question: "Know Java?", answer: "yes"}, {question: "Know OOP?", answer: "No"},
    // {question: "Teaching Certificate?", answer: "No answer Provided"}]},
    // {courseCode: "SE123", applicantName: "Bob", applicantEmail: "bob@uwo.ca", instructorRank: null, applicantRank: null},
    //  {courseCode: "SE123", applicantName: "Charles", applicantEmail: "charles@uwo.ca", instructorRank: null, applicantRank: null}
    // ],
    //     courseCode: "SE123",
    //     createdAt: "2021-03-06T01:33:23.426Z",
    //     hiringEventID: "603eb9299195d0d7707675ad",
    //     instructorID: null,
    //     questionFile: [],
    //     rankingFile: null,
    //     requiredHours: 13,
    //     status: "created",
    //     updatedAt: "2021-03-06T02:23:33.122Z",
    //     __v: 0,
    //     _id: "6042dbe36c43d03958b969d8"}
    //     //this.currentCourse = history.state.data.currentCourse;
  }

  getRole() {
    this.role = localStorage.getItem('role');
  }




  //gets the array of questions from the reactive form
  get questions(): FormArray {
    return this.evaluationForm.get('questions') as FormArray;
  }

  updateCourseInstructor(instructor){
    console.log("updating the instructor to the id", instructor._id)
    this.courseService.updateCourseInstructor(this.currentCourse._id, instructor._id).subscribe(course=>{
      console.log("course instructor has been udpated")
    })
  }

  // for adding a new question input
  addQuestion() {
    console.log('new question added');
    //this.questions.push(this.fb.control(""));
    this.questions.push(new FormControl());
  }
  //toggles div visibility to allow users to create
  createEval() {
    this.createQuestions = !this.createQuestions;
  }
  save() {
    this.courseService
      .updateQuestions(this.currentCourse._id, this.questions.value)
      .subscribe((element) => {
        console.log('SUCCESS in updating questions');
        console.log(element);
        //On successful execution call the notification function
        this.notifyAdmin(this.currentCourse.courseCode);
      });
  }
  notifyAdmin(courseID) {
    this.senderEmail = 'arsh.lalani@akahyd.org';
    this.receiverEmail = 'sanah@yahoo.com';
    this.receiverRole = 'admin';
    const course = courseID;
    this.notificationMessage =
      'The Instructor has created the evaluation for the course ' + course;

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

  returnToHiringEvent() {
    this.router.navigate(['hiringEventHome']);
  }

  //shows popup with assigned TAs
  viewAssigned(course) {
    this.courseService
      .getMatches(this.currentCourse.courseCode)
      .subscribe((event) => {
        let tas = event as Array<any>;
        for (let ta of tas) {
          if (ta.status == 'pending') {
            console.log(ta.name);
            this.suggestedTAs.push(ta.name);
          }
        }
        console.log(this.suggestedTAs, 'are the suggested TAs');
      });
  }

  reject(data) {
    console.log(data);
    this.courseService
      .rejectMatch(data, this.currentCourse.courseCode)
      .subscribe((event) => {
        console.log(event, 'nyeaheh');
      });
  }

  confirm(data) {
    console.log(data);
    this.courseService
      .confirmMatch(data, this.currentCourse.courseCode)
      .subscribe((event) => {
        console.log(event, 'nyeaheh');
      });
  }

  //visibility for the hours modification form
  visibility = 'hidden';
  taHours: number;

  //change the TA hours submission button
  submitResponse(newHours) {
    //updates the local hours variable
    this.taHours = newHours;
    console.log(this.taHours);
    this.currentCourse.requiredHours = newHours;
    this.courseService
      .editTAHours(this.currentCourse._id, newHours)
      .subscribe((response) => {
        console.log(response, 'TA HOURS UPDATED');
      });

    //changes visibility of form to close
    this.close();
  }

  //changes visibility of form to display
  changeHours() {
    this.visibility = 'visible';
  }

  //changes visibility of form to close
  close() {
    this.visibility = 'hidden';
  }

  getMatches() {
    this.hiringEventService
      .getMatches(this.currentCourse.hiringEventID, this.currentCourse._id)
      .subscribe((matches) => {
        if (matches[0] != undefined) {
          this.currentMatches = matches[0];
        }
      });
  }

  removeTA(matchInput) {
    this.currentMatches.applicants.forEach((match, i) => {
      if (match == matchInput) {
        this.currentMatches.applicants.splice(i, 1);
      }
    });

    let number = this.currentMatches.hoursFilled - parseInt(matchInput.hours);

    this.currentMatches.hoursFilled = number;

    this.hiringEventService
      .addCustomApplicant(this.currentMatches)
      .subscribe((match) => {
        console.log('updated matches');
      });
  }

  toggleAddTA() {
    console.log(this.addTA);
    this.addTA = !this.addTA;
  }

  onSubmit(): void {
    let newMatch = {
      applicantName: this.checkoutForm.value.applicantName,
      applicantEmail: this.checkoutForm.value.applicantEmail,
      hours: this.checkoutForm.value.hours,
      priority: 'custom',
      status: 'accepted',
    };
    console.log(typeof this.currentMatches.hoursFilled);
    console.log(typeof parseInt(this.checkoutForm.value.hours));
    console.log(parseInt(this.checkoutForm.value.hours));
    let number =
      this.currentMatches.hoursFilled + parseInt(this.checkoutForm.value.hours);

    this.currentMatches.hoursFilled = number;

    this.currentMatches.applicants.push(newMatch);

    this.hiringEventService
      .addCustomApplicant(this.currentMatches)
      .subscribe((match) => {
        console.log('updated matches');
      });
    this.checkoutForm.reset();
  }

  findCourseInfo(){
    this.courseService
      .courseInfo(this.currentCourse.courseCode)
      .subscribe((info) => {

        this.courseName = info["Course Name"];
        this.ltHours = info["Lab/Tutorial hours"];
        this.lecHours = info["Lec hours"];
        this.noSections = info["No of Sections"];

        if(this.ltHours == undefined){
          this.ltHours = 0;
        }
      });
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { read, IWorkBook } from 'ts-xlsx';
import * as XLSX from 'ts-xlsx';
import { HiringEventService } from "../hiring-event.service";
import { CourseService } from "../course.service";
import {HiringEventHomeComponent } from "../hiring-event-home/hiring-event-home.component";
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-responses-upload-page',
  templateUrl: './responses-upload-page.component.html',
  styleUrls: ['./responses-upload-page.component.css']
})
export class ResponsesUploadPageComponent {

  @Input() currentCourse: any;
  @Input() currentHiringEvent: any;

  @Input() uploadType: any;
  notificationMessage: any;
  senderEmail: any;
  receiverEmail: any;
  receiverRole: any;
  closeResult = '';
  keys = [];
  updatedKeys = {};

  columns = [];
  fileObject;

  constructor(private hiringEventService: HiringEventService,
    private courseService: CourseService,
    private hiringEventHome: HiringEventHomeComponent,
    private modalService: NgbModal,
    ) { }


  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result
  }

  arrayBuffer: any;
  file: File;
  incomingfile(event, content) {
    this.file = event.target.files[0];
    this.open(content)

    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      const fileObject = XLSX.utils.sheet_to_json(worksheet, { raw: true })
      this.fileObject = fileObject;
      this.keys = (Object.keys(fileObject[0]));
    }
    fileReader.readAsArrayBuffer(this.file);

  }

  popColumn(key){
    const index = this.keys.indexOf(key);
    if (index > -1) {
      this.keys.splice(index, 1);
    }
    this.fileObject.forEach(element =>{
      delete element[key];
    })
  }
  onKey(event, key) {this.updatedKeys[key]=event.target.value;}

  editColumn(key){

  }


  Upload(modal) {
    modal.close('Save click')
    //Update any key values
    this.fileObject.forEach(element =>{
      for (const [key, value] of Object.entries(this.updatedKeys)) {
        delete Object.assign(element, {[value.toString()]: element[key] })[key];
      }
    })

      if (this.fileObject) {
        if (this.uploadType == "question") {
          this.courseService.updateQuestions(this.currentCourse._id, this.fileObject).subscribe(object => {
            console.log("Success in uploading questions.\n", this.fileObject, "has been uploaded")
          })
        }
        if (this.uploadType == "answer") {
          this.hiringEventService.updateAnswers(this.currentHiringEvent._id, this.fileObject).subscribe(object => {
            console.log("Success in uploading answers.\n", this.fileObject, "has been uploaded");
            //after uploading the answers, notify instructor
            this.notifyInstructor();
          })
        }
        if (this.uploadType == "upload") {
          this.hiringEventService.updateTaHours(this.currentHiringEvent._id, this.fileObject).subscribe(object => {
            console.log("UPDATED ")
            console.log("Success in uploading enrollment information.\n", this.fileObject, "has been uploaded")
          })
        }
        if (this.uploadType == "email") {
          console.log("upload type is email")
           this.hiringEventService.updateInstructors(this.currentHiringEvent._id, this.fileObject)
           .subscribe(object => {
            console.log("UPDATED ")
            console.log("Success in uploading enrollment information.\n", this.fileObject, "has been uploaded")
          })
        }
        if(this.uploadType == "uploadCourse"){
          //each element of array  -> course code
          //call the function
          let test = [];
          for(let i=0; i<=this.fileObject.length-1; i++){
            test.push(this.fileObject[i]["Course Code"]);
            //add new course for each of the course code in the excel
            this.addNewCourse(this.fileObject[i]["Course Code"], this.fileObject[i]);

          }
          console.log(this.fileObject);
          console.log(test);

        }
      }




  }

  notifyInstructor() {
    this.senderEmail = "sanah@yahoo.com";
    this.receiverEmail = "arsh.lalani@akahyd.org";
    this.receiverRole = "instructor";
    this.notificationMessage = "The Admin has uploaded the answers for the course ";

    // call the notification api route
    this.courseService.notifyUser(this.notificationMessage, this.senderEmail, this.receiverEmail, this.receiverRole).subscribe(response => {
      console.log("Notification Sent Successfully");
      console.log(response);
    });

  }

addNewCourse(courseCode, courseInfo) {

  console.log(courseInfo);
  this.courseService.createNewCourse(courseCode, courseInfo, this.currentHiringEvent._id)
    .subscribe((courses) => {
      this.hiringEventHome.getCourses();
    });
}




}

import { Component, OnInit, Input } from '@angular/core';
import { read, IWorkBook } from 'ts-xlsx';
import * as XLSX from 'ts-xlsx';
import { HiringEventService } from "../hiring-event.service";
import { CourseService } from "../course.service";

@Component({
  selector: 'app-responses-upload-page',
  templateUrl: './responses-upload-page.component.html',
  styleUrls: ['./responses-upload-page.component.css']
})
export class ResponsesUploadPageComponent  {

  @Input() currentCourse:any;
  @Input() currentHiringEvent:any;

   @Input() uploadType: any;
   notificationMessage:any;
   senderEmail:any;
   receiverEmail:any;
   receiverRole:any;
 


  constructor(private hiringEventService:HiringEventService,
              private courseService: CourseService) { }


  arrayBuffer:any;
file:File;
incomingfile(event)
  {
  this.file= event.target.files[0];
  }

 Upload() {
      let fileReader = new FileReader();
        fileReader.onload = (e) => {
            this.arrayBuffer = fileReader.result;
            var data = new Uint8Array(this.arrayBuffer);
            var arr = new Array();
            for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
            var bstr = arr.join("");
            var workbook = read(bstr, {type:"binary"});
            var first_sheet_name = workbook.SheetNames[0];
            var worksheet = workbook.Sheets[first_sheet_name];
            const fileObject = XLSX.utils.sheet_to_json(worksheet,{raw:true})
            if(fileObject){
              if(this.uploadType == "question"){
                this.courseService.updateQuestions(this.currentCourse._id, fileObject).subscribe(object => {
                  console.log("Success in uploading questions.\n", fileObject, "has been uploaded")
                })
              }
              if(this.uploadType == "answer"){
                this.hiringEventService.updateAnswers(this.currentHiringEvent._id, fileObject).subscribe(object => {
                  console.log("Success in uploading answers.\n", fileObject, "has been uploaded");
                  //after uploading the answers, notify instructor
                  this.notifyInstructor();
                })
              }
              if(this.uploadType == "upload"){
                this.hiringEventService.updateTaHours(this.currentHiringEvent._id, fileObject).subscribe(object => {
                  console.log("UPDATED ")
                  console.log("Success in uploading enrollment information.\n", fileObject, "has been uploaded")
                })
              }
            }
        }
        fileReader.readAsArrayBuffer(this.file);

       
}

notifyInstructor(){
  this.senderEmail = "sanah@yahoo.com";
  this.receiverEmail = "arsh.lalani@akahyd.org";
  this.receiverRole = "instructor";
  this.notificationMessage = "The Admin has uploaded the answers for the course ";

  // call the notification api route 
  this.courseService.notifyUser(this.notificationMessage, this.senderEmail, this.receiverEmail, this.receiverRole).subscribe(response=>{
    console.log("Notification Sent Successfully");
    console.log(response);
  });

}



}

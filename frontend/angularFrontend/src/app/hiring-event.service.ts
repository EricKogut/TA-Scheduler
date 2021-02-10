import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from "./environment"
const baseUrl = environment.backend_url;


@Injectable({
  providedIn: 'root'
})
export class HiringEventService {

  constructor(private http: HttpClient) {}

  //GETs
  ///////////////////////////////////////////

  getAllEvents(){
    console.log("GETTING ALL EVENTS")
    return this.http.get(baseUrl+"/api/hiringEvents/getAll")
  }

  getEvent(_id){
    console.log("GETTING EVENT WITH ID")
    return this.http.get(baseUrl+"/api/hiringEvents/getEvent/"+_id)
  }


  //PUTs
  ///////////////////////////////////////////
  createEvent(courseCode:string, departmentChairID:string,){
    return this.http.put(baseUrl+"/api/create/hiringEvent", {courseCode:courseCode, departmentChairID: departmentChairID})
  }
  updateQuestions(_id, questions){
    return this.http.put(baseUrl+"/api/update/hiringEvent/questions", {_id:_id, questions: questions})
  }
   updateAnswers(_id, answers){
    return this.http.put(baseUrl+"/api/update/hiringEvent/answers", {_id:_id, answers: answers})
  }

  updateRanking(_id, applicantResponsesUpdated){
    console.log("updating answers")
    return this.http.put(baseUrl+"/api/update/hiringEvent/instructorRanking", {_id:_id, applicantResponsesUpdated: applicantResponsesUpdated})
  }
}

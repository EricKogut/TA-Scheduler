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
    return this.http.get(baseUrl+"/hiringEvents/getAll")
  }

  getEvent(_id){
    return this.http.get(baseUrl+"/hiringEvents/getEvent/"+_id)
  }


  //PUTs
  ///////////////////////////////////////////
  createEvent(courseCode:string, departmentChairID:string,){
    return this.http.put(baseUrl+"/create/hiringEvent", {courseCode:courseCode, departmentChairID: departmentChairID})
  }
  updateQuestions(_id, questions){
    return this.http.put(baseUrl+"/update/hiringEvent/questions", {_id:_id, questions: questions})
  }
   updateAnswers(_id, answers){
    return this.http.put(baseUrl+"/update/hiringEvent/answers", {_id:_id, answers: answers})
  }

  updateRanking(_id, applicantResponsesUpdated){
    return this.http.put(baseUrl+"/update/hiringEvent/instructorRanking", {_id:_id, applicantResponsesUpdated: applicantResponsesUpdated})
  }

  updateHours(_id, hours){
    return 0;
  }
}

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

  getMatches(course){
    return this.http.get(baseUrl+"/hiringEvent/matches/"+course)
  }

  confirmMatch(name, course){
    return this.http.get(baseUrl+"/hiringEvent/confirmMatch/"+name+"/"+course)
  }

  rejectMatch(name, course){
    return this.http.get(baseUrl+"/hiringEvent/rejectMatch/"+name+"/"+course)
  }

  manualMatch(name, course){
    return this.http.get(baseUrl+"/hiringEvent/manualMatch/"+name+"/"+course)
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
}

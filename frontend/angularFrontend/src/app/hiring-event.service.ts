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
  getUserEvents(departmentChairId){
    return this.http.get(baseUrl+"/get/chairHiringEvents/"+departmentChairId);
  }

  getTaHours(courseID){
    return this.http.get(baseUrl+"/get/tahour/"+"ECE 2231B");
  }



  //PUTs
  ///////////////////////////////////////////
  createEvent(departmentChairID:string){
    return this.http.put(baseUrl+"/create/hiringEvent", {departmentChairID: departmentChairID})
  }
  updateQuestions(_id, questions){
    return this.http.put(baseUrl+"/update/hiringEvent/questions", {_id:_id, questions: questions})
  }
   updateAnswers(_id, answers){
    return this.http.put(baseUrl+"/update/hiringEvent/answers", {_id:_id, answers: answers})
  }


  updateTaHours(_id,enrollmentInfo){
    console.log(_id, "IS THE INPUTTED ID")
    return this.http.put(baseUrl+ "/update/hiringEvent/hours", {_id:_id, enrollmentInfo: enrollmentInfo})
  }

  modifyTaHours(courseCode, hours){
    return this.http.put(baseUrl+ "/update/hours", {courseCode: courseCode, hours: hours})
  }

  getPriority(priority){
    return this.http.put(baseUrl+ "/update/priority", {priority: priority})
  }

  addMatch(match){
    return this.http.put(baseUrl+ "/create/matches", {match: match})
  }

  addCustomApplicant(match){
    return this.http.put(baseUrl+ "/update/matches", {match: match})
  }

  getMatches(hiringEventID,courseID){
    return this.http.put(baseUrl+ "/get/matches", {hiringEventID: hiringEventID, courseID:courseID})
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {environment} from "./environment";
const baseUrl = environment.backend_url;
@Injectable({
  providedIn: 'root'
})
export class CourseService {

  constructor(private http: HttpClient) { }


  createNewCourse(courseCodeInput,  hiringEventIDInput){
    console.log(baseUrl+"/courses/createnew/")
    return this.http.put(baseUrl+"/courses/createnew/",
    {courseCode:courseCodeInput,
    hiringEventID:hiringEventIDInput})

  }

  getHiringEventCourses(idInput){
    return this.http.get<any[]>(baseUrl+"/courses/getAll/"+idInput)
  }

  getInstructorCourses(instructorID){
  return this.http.get(baseUrl+"/courses/getAll/instructorID/"+instructorID)
}

updateRanking(_id, applicantResponsesUpdated){
  return this.http.put(baseUrl+"/update/course/instructorRanking", {_id:_id, applicantResponsesUpdated: applicantResponsesUpdated})
}
updatePriority(_id, newPriority){
  return this.http.put(baseUrl+"/course/update/priority", {_id:_id, newPriority:newPriority});
}

updateCourses(hiringEventID,  applicantResponses){
  console.log(baseUrl+"/courses/createnew/")
  return this.http.put(baseUrl+"/courses/update/",
  {hiringEventID:hiringEventID,
  answerFile:applicantResponses})
}
updateRequiredHours(hiringEventID,  enrollmentFile){
  console.log(enrollmentFile, "is the enrollment file" )
  return this.http.put(baseUrl+"/courses/updatehours/",
  {hiringEventID:hiringEventID,
    enrollmentFile:enrollmentFile})

}

editTAHours(_id,newHours){
  console.log(_id, "IS THE INPUTTED ID")
  return this.http.put(baseUrl+ "/update/course/hours", {_id:_id, requiredHours: newHours})
}


getMatches(course){
  return this.http.get(baseUrl+"/hiringEvent/matches/"+course)
  console.log("Getting the matches for the following courses", course);
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

}

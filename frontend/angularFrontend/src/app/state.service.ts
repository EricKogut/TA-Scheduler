import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StateService {

  private _current_course;
  private _current_hiring_event;

  current_course;
  constructor(private http: HttpClient) { }

  getCurrentCourse(){
    return this._current_course;
  }
  setCurrentCourse(courseInput){
    this._current_course = courseInput;
  }

  getCurrentHiringEvent(){
    return this._current_hiring_event
  }
  setCurrentHiringEvent(hiringEventInput){
    console.log("updated hiring event")
    this._current_hiring_event = hiringEventInput;
  }
}

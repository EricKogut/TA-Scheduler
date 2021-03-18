import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from "./environment"

const baseUrl = environment.backend_url;

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  constructor(private http: HttpClient) {}

  test(){
    return this.http.get(baseUrl+"/test")
  }


  signup(data){
    return this.http.post<any>(baseUrl+"/signup", data)
  }

  login(data){
    return this.http.post<any>(baseUrl+"/login", data)
  }


  addinstructor(name: string, email: string, course: string){
    return this.http.post(baseUrl + '/api/add/instructor',{
      "name": name,
      "email": email,
      "course": course

    })
  }

  saveQuestions(questions: any) {
    return this.http.post(baseUrl+"api/addEvaluation/questions", questions);
  }

  //gets notifications for a specific user from backend
  getNotifications(recipient){
    return this.http.get(baseUrl+"/notification/admin/receive/evaluation/"+ recipient);
  }

}


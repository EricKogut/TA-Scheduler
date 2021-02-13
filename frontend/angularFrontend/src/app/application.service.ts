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

<<<<<<< HEAD
  addinstructor(name: string, email: string, course: string){
    return this.http.post(baseUrl + '/api/add/instructor',{
      "name": name,
      "email": email,
      "course": course

    })
  }

||||||| 05bb6cc
=======
  saveQuestions(questions: any) {
    return this.http.post(baseUrl+"api/addEvaluation/questions", questions);
  }

>>>>>>> main
}

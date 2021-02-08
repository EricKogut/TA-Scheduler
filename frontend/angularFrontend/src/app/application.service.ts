import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  addinstructor(name: string, email: string, course: string){
    return this.http.post(baseUrl + '/api/add/instructor',{
      "name": name,
      "email": email,
      "course": course

    })
  }

}

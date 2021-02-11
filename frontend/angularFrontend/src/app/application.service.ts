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

  signup(data){
    return this.http.post<any>(baseUrl+"/signup", data)
  }

  login(data){
    return this.http.post<any>(baseUrl+"/login", data)
  }

}

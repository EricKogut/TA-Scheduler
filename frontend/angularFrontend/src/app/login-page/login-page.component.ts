import { Component, OnInit } from '@angular/core';
import { ApplicationService } from "../application.service";
import {Router} from "@angular/router"

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})


export class LoginPageComponent implements OnInit {

  constructor(private router: Router, private applicationService: ApplicationService) { }

  ngOnInit(): void {
  }


  login(data){
    console.log(data)
    console.log("signed in")
    this.applicationService.login(data).subscribe((res)=>{
      console.log(res,"is the res")
      localStorage.setItem('role', res.role);
      this.router.navigate(['landing']).then(()=>window.location.reload())
    } )
  }


}

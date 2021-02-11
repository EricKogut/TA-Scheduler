import { Component, OnInit } from '@angular/core';
import { ApplicationService } from "../application.service";
import {Router} from "@angular/router"

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {



  constructor(private router: Router, private applicationService: ApplicationService) { }

  ngOnInit(): void {
  }

  signup(data){
    console.log(data)

    this.applicationService.signup(data).subscribe(res=>{
      console.log(res)
      localStorage.setItem('role', res.role);
      this.router.navigate(['landing']).then(()=>window.location.reload())
    } )
  }

}

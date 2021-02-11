import { Component, OnInit } from '@angular/core';
import { ApplicationService } from "../application.service";


@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css']
})
export class SignupPageComponent implements OnInit {



  constructor(private applicationService: ApplicationService) { }

  ngOnInit(): void {
  }

  signup(data){
    console.log(data)

    this.applicationService.signup(data).subscribe(res=>{
      console.log(res)
    } )
  }

}

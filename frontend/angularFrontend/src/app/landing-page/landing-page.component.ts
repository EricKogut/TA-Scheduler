import { ApplicationInitStatus, Component, OnInit } from '@angular/core';
import { ApplicationService } from "../application.service";
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent implements OnInit {

  instructor = '';
  course = '';
  email = '';



  constructor(private applicationService: ApplicationService) { }

  //Variables
  public data;

  ngOnInit(): void {
    this.applicationService.test().subscribe(data => {
      console.log(data, "is the data")
      this.data = data
    })
  }

  submitInstructor() {
    this.applicationService.addinstructor(this.instructor, this.email, this.course).subscribe(
      response => {
        console.log("Instructor successfully added to the database");
        console.log(response);

      }, error => {
        alert(error.error);
      });

  }



}

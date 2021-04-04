import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../application.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrls: ['./signup-page.component.css'],
})
export class SignupPageComponent implements OnInit {
  role: string = localStorage.getItem('role');

  constructor(
    private router: Router,
    private applicationService: ApplicationService
  ) {}

  ngOnInit(): void {}

  signup(data) {
    console.log(data);

    this.applicationService.signup(data).subscribe((res) => {
      console.log(res);

      if(!localStorage.getItem('role')) {
        localStorage.getItem('role')
        localStorage.setItem('role', res.role);
        localStorage.setItem('email', res.email);
        localStorage.setItem('userID', res.userID);
        localStorage.setItem('_id', res._id);
        this.router.navigate(['landing']).then(() => window.location.reload());
      }
    });
  }
}

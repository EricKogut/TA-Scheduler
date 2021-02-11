import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router"

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: Router) { }


  ///////////////
  //NAVIGATION///
  //Navigating to the main search page
  navigateToLogin(){
    this.router.navigate(['login']);
  }

  navigateToSignUp(){
    this.router.navigate(['signup']);
  }

  navigateToLanding(){
    this.router.navigate(['landing']);
  }

  navigateToRanking(){
    this.router.navigate(['instructor-ranking']);
  }

  navigateToInstructor(){
    this.router.navigate(['instructor']);
  }

  ngOnInit(): void {
  }

}

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

  navigateToLanding(){
    this.router.navigate(['landing']);
  }


  ngOnInit(): void {
  }

}

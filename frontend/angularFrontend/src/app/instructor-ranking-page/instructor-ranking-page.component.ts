import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import {Router} from "@angular/router";
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-instructor-ranking-page',
  templateUrl: './instructor-ranking-page.component.html',
  styleUrls: ['./instructor-ranking-page.component.css']
})
export class InstructorRankingPageComponent implements OnInit{

  constructor(public fb: FormBuilder, private router: Router) {}

  numbers: any;

  ngOnInit(): void {
    this.numbers = [];
    this.counter();
  }

  //data in format from main model
  applicantResponses = [{
    applicantName: "John Doe",
    applicantEmail: 'jdoe@uwo.ca',
    applicantRanking: 8,
    adminRanking: 0,
    responses: [{
      question: "Educational experience?",
      answer: "Undergrad in Computer Science"
      },
      {
        question: "List any relevant teaching experience.",
        answer: "Teaching assistant for SE2202, SE2203, and SE2205"
    }]
  },
  {
      applicantName: 'Halston Shu',
      applicantEmail: 'hshu@uwo.ca',
      applicantRanking: 2,
      adminRanking: 0,
      responses: [{
          question: "Educational experience?",
          answer: "Undergrad in Biological Studies"
      },
      {
        question: "List any relevant teaching experience.",
        answer: "Teaching assistant for Bio1000"
    }]
  },
  {
        applicantName: 'Rio Trio',
        applicantEmail: 'rtrio@uwo.ca',
        applicantRanking: 2,
        adminRanking: 0,
        responses: [{
          question: "Educational experience?",
          answer: "Undergrad in Integrated Science, Masters in History"
          },
          {
            question: "List any relevant teaching experience.",
            answer: "None"
        }]
  }
  ];

  //goes back to 
  navigateToInstructorHome(){
    this.router.navigate(['instructor']);
  };

  //counter for number display next to rating scale
  counter(){
    for(let i = 0; i < this.applicantResponses.length; i++){
      this.numbers.push(i+1);
    }
  }

  //drag and drop functionalities
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.applicantResponses, event.previousIndex, event.currentIndex);
  }

  //submission of ranking function
  submit(event: CdkDragDrop<string[]>){

    const adminRankingAr =[];
    
    for(let n=0; n< this.applicantResponses.length; n++){
      adminRankingAr[n] = this.applicantResponses[n].applicantName;
      this.applicantResponses[n].adminRanking = n+1;
    }
    this.disableChanges();
  }

  //only enable submit button if confirmation check box is selected
  checkboxes = [{label: 'I understand that this ranking may only be submit once.', state:''}];
  
  buttonState() {
    return !this.checkboxes.some(_ => _.state);
  }

  //remove ranking system upon submit
  public show:boolean = true;
  public show2:boolean = false;

  disableChanges() {
    this.show = !this.show;
    this.show2 = !this.show2
  }

  //hide display of applications until view button is clicked
  public view:boolean = false;
  public viewButton:any = 'Hide';

  displayApp(){
    this.view = !this.view;

    if(this.view)
      this.viewButton = "Hide Application"; 
    else
      this.viewButton = "View Previous"; 
  }

  //found application from searching
  foundApp: any;

  findApp(name){

    //empty application object
    this.foundApp = [{
      foundName: "",
      foundEmail: "",
      foundResponses: [{
          foundQuestion: "",
          foundAnswer: ""
      },{
        foundQuestion: "",
        foundAnswer: ""
    }]
    }];
    
    //load found object details into empty object
    for(let i = 0; i < this.applicantResponses.length; i++){
      if(name == this.applicantResponses[i].applicantName){
        this.foundApp[0].foundName = this.applicantResponses[i].applicantName;
        this.foundApp[0].foundEmail = this.applicantResponses[i].applicantEmail;
        for(let j = 0; j < this.applicantResponses[i].responses.length; j++){
          this.foundApp[0].foundResponses[j].foundQuestion = this.applicantResponses[i].responses[j].question;
          this.foundApp[0].foundResponses[j].foundAnswer = this.applicantResponses[i].responses[j].answer;
        }
      }
    }
    //call display function to make the display visible
    this.displayApp();
  }
}
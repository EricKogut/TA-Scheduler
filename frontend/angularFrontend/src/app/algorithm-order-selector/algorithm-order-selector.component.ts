import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-algorithm-order-selector',
  templateUrl: './algorithm-order-selector.component.html',
  styleUrls: ['./algorithm-order-selector.component.css']
})
export class AlgorithmOrderSelectorComponent {

  isSubmitted = false;
  constructor() { }

 runAlgorithm(myForm: NgForm) {
  this.isSubmitted = true;
  if(!myForm.valid) {
    return false;
  } else {
    alert(JSON.stringify(myForm.value.order));
  }
}
}

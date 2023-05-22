import { Component } from '@angular/core';

@Component({
  selector: 'app-calculos',
  templateUrl: './calculos.component.html',
  styleUrls: ['./calculos.component.css']
})

export class CalculosComponent {
  num1: number = null;
  num2: number = null;
  result: number = null;

  multiply() {
    if (this.num1 !== null && this.num2 !== null) {
      this.result = this.num1 * this.num2;
    }
  }
}


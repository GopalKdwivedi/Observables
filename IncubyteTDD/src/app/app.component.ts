import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Incubyte';
  Form!: FormGroup;
  output: number = 0;

  ngOnInit(): void {
    this.Form = new FormGroup({
      problem: new FormControl(null, [
        Validators.required,
        Validators.pattern(/^[0-9,-]+$/),  // Adjusted to allow hyphens as well
      ]),
    });
  }

  Submit(): void {
    if (this.Form.valid) {
      this.output = this.sumNumbers(this.Form.value.problem);
    }
  }

  Clear(): void {
    this.Form.reset();
    this.output = 0;
  }

  sumNumbers(s: string): number {
    if (!s) return 0;  // Handle empty input

    // Split the string by commas, remove invalid entries, and parse numbers
    const numbers = s.split(',').map(num => num.trim()).filter(num => !isNaN(Number(num))).map(Number);

    // Sum up the numbers
    return numbers.reduce((acc, num) => acc + num, 0);
  }

}

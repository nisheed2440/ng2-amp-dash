import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pd-app',
  template: `
   <amp-dash [typeText]="title"></amp-dash>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  title:string;
  constructor() { }

  ngOnInit() {
    this.title = 'Hello World';
  }

}

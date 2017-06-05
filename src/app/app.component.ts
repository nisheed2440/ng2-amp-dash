import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'pd-app',
  template: `
   <amp-dash [typeText]="title" [eraseDelay]="500" (captionTyped)="handleEvent($event)" [typeLoop]="true" (charErased)="charErased($event)"></amp-dash>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  title:string | string[] ;
  constructor() { }

  ngOnInit() {
    this.title = [`Hello World`];
  }
  handleEvent(){
    console.log(arguments);
  }

  charErased() {
    console.log(arguments);
  }

}

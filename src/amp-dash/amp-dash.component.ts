import { Component, DoCheck, EventEmitter, Input, OnChanges, OnDestroy, Output } from '@angular/core';

@Component({
  selector: 'amp-dash',
  templateUrl: './amp-dash.component.html',
  styleUrls: ['./amp-dash.component.scss']
})
export class AmpDashComponent implements OnDestroy, OnChanges {
  @Input() typeText: string | string[] = [''];
  @Input() typeDelay = 100;
  @Input() typeLoop = false;
  @Input() eraseDelay = 2000;
  @Input() cursorClass = 'cursor';
  @Input() cursorChar = '_';
  @Output() captionTyped = new EventEmitter();
  @Output() captionErased = new EventEmitter();
  captionText = '';
  captionLength = 0;
  displayText = '';
  typeTimeout: any;
  eraseTimeout: any;
  eraseDelayTimeout: any;
  captionIndex =  0;
  typeTextClone: string | string[] = [''];
  constructor() { }

  ngOnDestroy() {
    // Cleanup
    this.clearTimeouts();
  }

  ngOnChanges(changes: any) {

    if(changes) {
      // If Text already exisits then delete it gracefully
      if(this.displayText) {
        if(
             changes.typeText 
          || changes.typeDelay 
          || changes.eraseDelay
          || changes.typeLoop
          ){
          this.clearTimeouts();
          this.captionIndex = 0;
          this.setTypeText();
          this.eraseDelayTimeout = setTimeout(() => this.erasewrite() , this.eraseDelay);
        }
      } else {
        // Typewrite the data
        this.captionIndex = 0;
        this.typewrite();
      }
    }
  }

  setTypeText(textArr?: string[]): void {
    // Check for passed in params
    if(textArr) {
       this.typeTextClone = textArr;
       return;
    }
    // Convert to array of strings
    if(typeof this.typeText === 'string') {
      this.typeTextClone = [this.typeText];
    }
    // Check if length > 0
    if(Array.isArray(this.typeText) && this.typeText.length) {
      this.typeTextClone = this.typeText;
    }
    return;
  }

  typewrite() {
    this.clearTimeouts();
    this.setTypeText();
    if(this.typeTextClone.length) {
      this.setCaptionText();
      this.type();
    }
  }

  erasewrite() {
    this.clearTimeouts();
    this.captionText = this.displayText;
    this.captionLength = this.displayText.length;
     // Check if length > 0
    if(this.captionLength) {
      this.erase();
    }
  }

  type() {
    this.displayText = this.captionText.substr(0, this.captionLength++);
    this.clearTimeouts();
    if(this.captionLength < this.captionText.length + 1) {
      this.typeTimeout = setTimeout(() => this.type() , this.typeDelay);
    } else {
      this.captionLength = 0;
      this.captionText = '';
      this.captionTyped.emit([this.displayText, this.captionIndex - 1]);
      if(this.captionIndex < this.typeTextClone.length) {
        // Erase after timeout
        this.eraseDelayTimeout = setTimeout(() => this.erasewrite(), this.eraseDelay);
      } else {
        if(this.typeLoop === true) {
          this.captionIndex = 0;
          this.eraseDelayTimeout = setTimeout(() => this.erasewrite() , this.eraseDelay);
        }
      }
    }
  }

  erase() {
    this.displayText = this.captionText.substr(0, this.captionLength--);
    this.clearTimeouts();
    if(this.captionLength >= 0) {
      this.eraseTimeout = setTimeout(() => this.erase() , this.typeDelay);
    } else {
      this.captionLength = 0;
      this.captionText = '';
      this.captionErased.emit([this.displayText, this.captionIndex - 1]);
      if(this.captionIndex < this.typeTextClone.length) {
        this.setCaptionText();
        this.type();
      }
    }
  }

  setCaptionText() {
    this.captionText = this.typeTextClone[this.captionIndex++].trim();
  }

  cancelTypeTimeout() {

    if(this.typeTimeout) {
      clearTimeout(this.typeTimeout);
    }
  }

  cancelEraseTimeout() {
    if(this.eraseTimeout) {
      clearTimeout(this.eraseTimeout);
    }
    if(this.eraseDelayTimeout) {
      clearTimeout(this.eraseDelayTimeout);
    }
  }

  clearTimeouts() {
    this.cancelTypeTimeout();
    this.cancelEraseTimeout();
  }
}

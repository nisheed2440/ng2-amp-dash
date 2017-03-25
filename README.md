# ![AMP DASH](src/assets/images/amp-dash.gif)

[![npm version](https://badge.fury.io/js/amp-dash.svg)](https://badge.fury.io/js/amp-dash)
[![Build Status](https://travis-ci.org/nisheed2440/ng2-amp-dash.svg?branch=master)](https://travis-ci.org/nisheed2440/ng2-amp-dash)

**amp-dash** is an [Angular 2](http://www.angular.io) component that types. Enter in any string, and watch it type at the speed you've set, backspace what it's typed, and begin a new sentence for however many strings you've set.

**amp-dash** was inspired by [SapientRazorfish](http://www.sapientrazorfish.com) logo and created to be used to follow brand guidelines. 

---

Installation
------------
To begin start by running

~~~javascript
npm install --save amp-dash
~~~

Next import into your `app module`

~~~typescript
//app.module.ts

import { AmpDashModule } from 'amp-dash';
//Other imports

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    //Other Modules
    AmpDashModule // <-- amp-dash module
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
~~~
That's it! You are ready to use the `amp-dash` component.

Usage
-----
### Basic usage
~~~html
<!-- app.component.html -->
<div class="app">
    <h1>
        <amp-dash [typeText]="'Hello World'"></amp-dash>
    </h1>
</div>
~~~

### String Collections
You can provide string collections by passing an array to the `typeText` property.

The strings can new lines by providing the `\n` character.
~~~html
<!-- app.component.html -->
<div class="app">
    <h1>
        <amp-dash 
            [typeText]="['Hello World','Foo Bar']"
        ></amp-dash>
        <!-- New line in strings -->
        <amp-dash 
            [typeText]="['Hello\nWorld','Foo\nBar']"
        ></amp-dash>
    </h1>
</div>
~~~

### With type delay
You can provide a type delay i.e. the amount of time before the next character is printed by overriding the `typeDelay` property.

`typeDelay` is measured in milliseconds (ms).

~~~html
<!-- app.component.html -->
<div class="app">
    <h1>
        <!-- Provide a 300ms type delay -->
        <amp-dash 
            [typeText]="'Hello World'"
            [typeDelay]="300"
        ></amp-dash>
    </h1>
</div>
~~~

### With erase delay
You can provide an erase delay i.e. the amount of time before the displayed string is erased by overriding the `eraseDelay` property. `eraseDelay` is used in combination with `typeLoop` which loops over the collections of strings provided in the `typeText`.

`eraseDelay` is measured in milliseconds (ms).

~~~html
<!-- app.component.html -->
<div class="app">
    <h1>
        <!-- Provide a 3000ms (3 second) erase delay -->
        <amp-dash 
            [typeText]="'Hello World'"
            [eraseDelay]="3000"
            [typeLoop]="true"
        ></amp-dash>
    </h1>
</div>
~~~

### Updating the cursor
By default `amp-dash` comes the `_` cursor character, which is animated by the class `cursor`. In order to update the character and to style it differently you can use the `cursorChar` & `cursorClass` properties.

~~~html
<!-- app.component.html -->
<div class="app">
    <h1>
        <!-- Change the cursor character to `|` and class to `blinky-cursor` -->
        <amp-dash 
            [typeText]="'Hello World'"
            [cursorChar]="'|'"
            [cursorClass]="'blinky-cursor'"
        ></amp-dash>
    </h1>
</div>
~~~

### Handling callbacks
You can handle the events like:

`captionTyped` triggered when each string has finished being displayed on the screen.

Or

`captionErased` triggered when each string has finished being erased from the screen.

~~~html
<!-- app.component.html -->
<div class="app">
    <h1>
        <amp-dash 
            [typeText]="['Hello World','Foo Bar']"
            (captionTyped)="handleTyped($event)" 
            (captionErased)="handleErased($event)" 
        ></amp-dash>
    </h1>
</div>
~~~
### Component Properties

Property | Type | Default Value | Description
:---|:---|:---|:---
typeText | `string or array` | `['']` | The strings to be typed
typeDelay | `number` | `100` | Delay in ms before a character is printed
eraseDelay | `number` | `2000` | Delay in ms before the displayed string is erased
typeLoop | `boolean` | `false` | Loop over the string collection
cursorClass | `string` | `cursor` | Class name applied to the cursor character
cursorChar | `string` | `_` | The cursor character to be displayed by default
captionTyped | `function` |  | Event fired when each string has finished being displayed on the screen 
captionErased | `function` |  | Event fired when each string has finished being erased from the screen

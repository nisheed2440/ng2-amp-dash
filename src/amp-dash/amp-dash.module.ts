import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmpDashComponent } from './amp-dash.component';
@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [AmpDashComponent],
  exports:[AmpDashComponent],
  entryComponents:[AmpDashComponent]
})
export class AmpDashModule { }

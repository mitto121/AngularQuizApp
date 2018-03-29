import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateInputsModule,DatePickerModule } from '@progress/kendo-angular-dateinputs';
@NgModule({
  imports: [
    CommonModule,
    DateInputsModule,
    DatePickerModule
  ],
  exports: [
    DateInputsModule,
    DatePickerModule
  ]
})
export class AppKendoModule { }

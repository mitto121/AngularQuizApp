import { Component, Input, OnInit } from '@angular/core';
import { AbstractControlDirective, AbstractControl } from '@angular/forms';
@Component({
  selector: 'show-validation-error',
  template: `<ul *ngIf="isValidField()" >
              <li style="color: red">
              {{getError()}}</li>
            </ul>`,
})
export class ShowValidationErrorComponent {

  @Input()
  control: AbstractControl;

  isValidField() {
     return this.control && this.control.errors
            && (this.control.dirty || this.control.touched);
  }

  getError(): string {
    let errors = Object.keys(this.control.errors)
     .map(field => this.getMessage(field, this.control.errors[field], this.control));
     return errors[0];

  }
  private getMessage(type: string, params: any, control: any) {

    let fname = this.getControlName(control);

    fname = fname.replace('_', ' ').replace(' id', '').toLowerCase();

    fname = fname.replace(/\b\w/g, l => l.toUpperCase());

    let msg = ShowValidationErrorComponent.validationMessage[type](params);

    return msg.replace('##FIELD##', fname);

  }
  getControlName(c: AbstractControl): string | null {
    const formGroup = c.parent.controls;
    return Object.keys(formGroup).find(name => c === formGroup[name]) || null;
  }

  private static readonly validationMessage = {
    'required': (params) => '##FIELD## can\'t be blank',
    'minlength': (params) => '##FIELD## should be minimum ' + params.requiredLength + ' characters',
    'maxlength': (params) => '##FIELD## should not be greater then ' + params.requiredLength + ' characters',
    'pattern': (params) => 'Should be a valid',
    'email': (params) => 'Should be vaild email.',
    'min': (params) => '##FIELD## should be minimum ' + params.min,
    'max': (params) => '##FIELD## should be less than ' + params.max,
    'MatchPassword':(params)=> 'Not match'
  };

}

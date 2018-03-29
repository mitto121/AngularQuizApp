import { Directive, forwardRef, Input } from '@angular/core';
import { FormControl,  AbstractControl, Validator, NG_VALIDATORS } from '@angular/forms';

@Directive({
  selector: '[compareValidator]',
  providers:[{
    provide:NG_VALIDATORS, useExisting:forwardRef(() => CompareValidatorDirective),multi:true
  }]
})
export class CompareValidatorDirective implements Validator {

  @Input() matchField:string;
  constructor() {}

  validate(control:AbstractControl):{ [key: string]: any }|null
  {      
    return  (control.parent.get(this.matchField).value)!==(control.value)?{ NotMatch: true }:null;
  }

}

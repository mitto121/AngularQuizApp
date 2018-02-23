import { Component, OnInit } from '@angular/core';
import { Iquestion } from '../../models/iquestion';
import { Question } from '../../models/question';
import { Ioption } from '../../models/ioption';
import { Option } from '../../models/option';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent implements OnInit {
  question: Iquestion;
  isAddOptionEnable: boolean;
  
  
  constructor() {
    this.setFormControl();
  }

  ngOnInit() {
    
  }

  addOption() {
    if(this.validateOptions())
    {
     let option = new Option();
     this.question.options.push(option);
    }


  }

  validateOptions()
  {
    return true;
  }

  removeOption(option) {
    let index = this.question.options.indexOf(option);
    if (index !== -1) {
      this.question.options.splice(index, 1)
    }
  }

  setFormControl() {
    this.question = new Question();
    this.question.options = [];
  }


}

import { Component, OnInit } from '@angular/core';
import { Iquestion } from '../../models/iquestion';
import { Question } from '../../models/question';
import { Ioption } from '../../models/ioption';
import { Option } from '../../models/option';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../services/question.service';


@Component({
  selector: 'app-question-master',
  templateUrl: './question-master.component.html',
  styleUrls: ['./question-master.component.css']
})
export class QuestionMasterComponent implements OnInit {
  quizId: number;
  question: Iquestion;
  questionList:Iquestion[];
  isAddOptionEnable: boolean;
  showQuestionModal: boolean;
  alertMessage: string;
  isValidForm: boolean = true;

  constructor(private _location: Location,
    private _activatedRoute: ActivatedRoute,
    private _questionService: QuestionService) {
    this.setFormControl();
  }

  ngOnInit() {
    this.quizId = this._activatedRoute.snapshot.params['id'];
    this._questionService.GetQuestionsByQuizId(this.quizId)
    .subscribe(
      res=>this.questionList=res,
    );
  }

  addOption() {
    this.isValidForm = this.validateOptions();
    if (this.isValidForm) {
      let noOfOptions = this.question.options.length;
      let option = new Option();
      option.code = String(1055 + noOfOptions);
      option.name = "";
      this.question.options.push(option);
    }
    else {
      this.alertMessage = "Option can't be empty";
    }
  }

  onQuestionChange() {
    this.isAddOptionEnable = this.question.name.trim().length > 0;
  }

  validateOptions(): boolean {

    let inValidCount = 0;
    this.question.options.forEach(function (opt, i) {

      if (opt.name.trim().length === 0) {
        inValidCount++;
      }
    });
    return inValidCount == 0;
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
    this.isValidForm=true;
    this.isAddOptionEnable=false;
  }

  setAnswer(question: Iquestion) {
    question.options.forEach(x => x.isAnswer = x.isSelected);
  }
  saveAndContinue() {  

    this.isValidForm = this.validateOptions();
    if (!this.isValidForm) {
      this.alertMessage = "Option can't be empty";
    }
    else {
      let hasQuestionExist=this.CheckQuestionExistOrNot();   
          if (hasQuestionExist) {
            this.alertMessage = 'This question is already exist';
            this.isValidForm = false;
          }
          else {
            this.showQuestionModal = true;
          }      
    }
  }
  private CheckQuestionExistOrNot():boolean
  {
    debugger;
    let question=this.question.name.replace(' ','').toLowerCase();
    let questions=this.questionList.filter(
      x=>x.name.replace(' ','').toLowerCase().indexOf(question)!== -1 
    )
    return questions && questions.length>0;
  }
  private createQuestion() {
    let hasAnswer = this.question.options.filter(x => x.isAnswer).length;
    if (hasAnswer && hasAnswer > 0) {
      this.question.quizId = this.quizId;
      this.addNewQuestion();
    }
    else {
      alert('please select answer');
    }
  }

  private addNewQuestion() {
    this._questionService.CreateQuestion(this.question)
      .subscribe(res => {
        if (res) {
          this._location.back();
        }
        else {
          alert('Failed !! something is wrong ,please try agin');
        }
      }, error => console.error(error));
  }

  closeModal(isdisplay) {
    this.showQuestionModal = isdisplay;
  }
}

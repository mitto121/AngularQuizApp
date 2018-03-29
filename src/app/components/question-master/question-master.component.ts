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
  questionList: Iquestion[];
  isAddOptionEnable: boolean;
  showQuestionModal: boolean;
  alertMessage: string;
  isValidForm = true;

  constructor(private _location: Location,
    private _activatedRoute: ActivatedRoute,
    private _questionService: QuestionService) {
    this.setFormControl();
  }

  ngOnInit() {
    this.quizId = this._activatedRoute.snapshot.params['id'];
    this._questionService.GetQuestionsByQuizId(this.quizId)
      .subscribe(
        res => this.questionList = res,
    );
  }

  addOption() {
    this.validateForm();
    if (this.isValidForm) {
      const noOfOptions = this.question.options.length;
      const option = new Option();
      option.code = String(1055 + noOfOptions);
      option.name = '';
      this.question.options.push(option);
    } 
  }

  onQuestionChange() {
    this.isAddOptionEnable = this.question.name.trim().length > 0;
  }

  validateForm() {
    if (!this.question.name.trim().length) {
      this.isValidForm = false;
      this.alertMessage = 'Question can\'t be empty';
    }
    else {
      let inValidCount = 0;
      this.question.options.forEach(function (opt, i) {

        if (opt.name.trim().length === 0) {
          inValidCount++;
        }
      });
      this.isValidForm= (inValidCount == 0);
      this.alertMessage = 'Option can\'t be empty'
    }   
  }

  removeOption(option) {
    const index = this.question.options.indexOf(option);
    if (index !== -1) {
      this.question.options.splice(index, 1);
    }
  }

  setFormControl() {
    this.question = new Question();
    this.question.options = [];
    this.isValidForm = true;
    this.isAddOptionEnable = false;
  }

  onCancel() {
    this._location.back();
  }
  saveAndContinue() {

    this.validateForm();
    if (this.isValidForm) {     
      const hasQuestionExist = this.CheckQuestionExistOrNot();
      if (hasQuestionExist) {
        this.alertMessage = 'This question is already exist';
        this.isValidForm = false;
      } else {
        this.showQuestionModal = true;
      }
    }

  }
  private CheckQuestionExistOrNot(): boolean {
    const question = this.question.name.replace(' ', '').toLowerCase();
    const questions = this.questionList.filter(
      x => x.name.replace(' ', '').toLowerCase().indexOf(question) !== -1
    );
    return questions && questions.length > 0;
  }
  private createQuestion() {    
    const hasSelected = this.question.options.filter(x => x.isSelected).length;
    if (hasSelected && hasSelected > 0) {
      this.question.options.forEach(x => x.isAnswer = x.isSelected);
      this.question.quizId = this.quizId;
      this.addNewQuestion();
    } else {
      alert('please select answer');
    }
  }

  private addNewQuestion() {
    this._questionService.CreateQuestion(this.question)
      .subscribe(res => {
        if (res) {
          this._location.back();
        } else {
          alert('Failed !! something is wrong ,please try agin');
        }
      }, error => console.error(error));
  }

  closeModal(isdisplay) {
    this.showQuestionModal = isdisplay;
  }
}

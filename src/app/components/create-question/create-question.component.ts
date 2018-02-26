import { Component, OnInit } from '@angular/core';
import { Iquestion } from '../../models/iquestion';
import { Question } from '../../models/question';
import { Ioption } from '../../models/ioption';
import { Option } from '../../models/option';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { QuestionService } from '../../services/question-service.service';


@Component({
  selector: 'app-create-question',
  templateUrl: './create-question.component.html',
  styleUrls: ['./create-question.component.css']
})
export class CreateQuestionComponent implements OnInit {
  quizId: number;
  question: Iquestion;
  isAddOptionEnable: boolean;
  showQuestionModal: boolean;
  isValidOption: boolean = true;


  constructor(private _location: Location,
    private _activatedRoute: ActivatedRoute,
    private _questionService: QuestionService) {
    this.setFormControl();
  }

  ngOnInit() {
    this.quizId = this._activatedRoute.snapshot.params['id'];
    if (localStorage.getItem('question')) {
      this.question = JSON.parse(localStorage.getItem('question'));
      this.showQuestionModal = true;
    }
  }

  addOption() {
    this.isValidOption = this.validateOptions();
    if (this.isValidOption) {
      let noOfOptions = this.question.options.length;
      let option = new Option();
      option.code = String(1055 + noOfOptions);
      option.name = "";
      this.question.options.push(option);
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
  }

  setAnswer(question: Iquestion) {
    question.options.forEach(x => x.isAnswer = x.isSelected);
  }
  saveAndViewModdal() {
    localStorage.setItem('question', JSON.stringify(this.question));
    this.showQuestionModal = true;
  }
  createQuestion() {
    localStorage.removeItem('question');
    this.question.QuizId = this.quizId;

    this._questionService.CreateQuestion(this.question)
      .subscribe(
        res => this._location.back(),
        error => console.error(error)
      );
      this._location.back();
  }
}

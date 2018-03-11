import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizAnswerSheetComponent } from './quiz-answer-sheet.component';

describe('QuizResultComponent', () => {
  let component: QuizAnswerSheetComponent;
  let fixture: ComponentFixture<QuizAnswerSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizAnswerSheetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizAnswerSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

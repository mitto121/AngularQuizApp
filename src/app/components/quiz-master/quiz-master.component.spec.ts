import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizMasterComponent } from './quiz-master.component';

describe('AddQuizComponent', () => {
  let component: QuizMasterComponent;
  let fixture: ComponentFixture<QuizMasterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizMasterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizMasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

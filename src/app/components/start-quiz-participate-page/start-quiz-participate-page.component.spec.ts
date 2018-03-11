import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartQuizParticipatePageComponent } from './start-quiz-participate-page.component';

describe('StartQuizParticipatePageComponent', () => {
  let component: StartQuizParticipatePageComponent;
  let fixture: ComponentFixture<StartQuizParticipatePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartQuizParticipatePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartQuizParticipatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartQuizDialogComponent } from './start-quiz-dialog.component';

describe('StartQuizComponent', () => {
  let component: StartQuizDialogComponent;
  let fixture: ComponentFixture<StartQuizDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartQuizDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartQuizDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

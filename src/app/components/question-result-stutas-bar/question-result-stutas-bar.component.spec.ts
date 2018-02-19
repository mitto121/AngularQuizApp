import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionResultStutasBarComponent } from './question-result-stutas-bar.component';

describe('QuestionResultStutasBarComponent', () => {
  let component: QuestionResultStutasBarComponent;
  let fixture: ComponentFixture<QuestionResultStutasBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionResultStutasBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionResultStutasBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

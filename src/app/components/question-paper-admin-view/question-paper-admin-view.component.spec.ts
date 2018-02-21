import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionPaperAdminViewComponent } from './question-paper-admin-view.component';

describe('QuestionPaperAdminViewComponent', () => {
  let component: QuestionPaperAdminViewComponent;
  let fixture: ComponentFixture<QuestionPaperAdminViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionPaperAdminViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionPaperAdminViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

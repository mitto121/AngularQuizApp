import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsListDialogComponent } from './questions-list-dialog.component';

describe('QuestionsListDialogComponent', () => {
  let component: QuestionsListDialogComponent;
  let fixture: ComponentFixture<QuestionsListDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionsListDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsListDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

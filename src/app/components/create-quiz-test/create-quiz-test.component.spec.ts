import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateQuizTestComponent } from './create-quiz-test.component';

describe('CreateQuizTestComponent', () => {
  let component: CreateQuizTestComponent;
  let fixture: ComponentFixture<CreateQuizTestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateQuizTestComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateQuizTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

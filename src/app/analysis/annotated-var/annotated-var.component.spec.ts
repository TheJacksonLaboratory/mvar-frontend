import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnotatedVarComponent } from './annotated-var.component';

describe('AnnotatedVarComponent', () => {
  let component: AnnotatedVarComponent;
  let fixture: ComponentFixture<AnnotatedVarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnotatedVarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnotatedVarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

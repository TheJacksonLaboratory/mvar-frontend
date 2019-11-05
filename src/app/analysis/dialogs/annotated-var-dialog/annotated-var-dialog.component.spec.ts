import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnnotatedVarDialogComponent } from './annotated-var-dialog.component';

describe('AnnotatedVarDialogComponent', () => {
  let component: AnnotatedVarDialogComponent;
  let fixture: ComponentFixture<AnnotatedVarDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnnotatedVarDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnnotatedVarDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

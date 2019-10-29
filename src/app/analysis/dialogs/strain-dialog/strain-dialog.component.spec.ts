import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StrainDialogComponent } from './strain-dialog.component';

describe('StrainDialogComponent', () => {
  let component: StrainDialogComponent;
  let fixture: ComponentFixture<StrainDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StrainDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StrainDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

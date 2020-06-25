import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SampleEditDialogComponent } from './sample-edit-dialog.component';

describe('SampleEditDialogComponent', () => {
  let component: SampleEditDialogComponent;
  let fixture: ComponentFixture<SampleEditDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SampleEditDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SampleEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

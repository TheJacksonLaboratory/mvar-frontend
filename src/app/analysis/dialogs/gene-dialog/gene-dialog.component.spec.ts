import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneDialogComponent } from './gene-dialog.component';

describe('GeneDialogComponent', () => {
  let component: GeneDialogComponent;
  let fixture: ComponentFixture<GeneDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

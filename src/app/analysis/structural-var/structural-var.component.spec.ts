import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StructuralVarComponent } from './structural-var.component';

describe('StructuralVarComponent', () => {
  let component: StructuralVarComponent;
  let fixture: ComponentFixture<StructuralVarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StructuralVarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StructuralVarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

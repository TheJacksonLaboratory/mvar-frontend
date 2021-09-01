import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MvarApiComponent } from './mvar-api.component';

describe('MvarApiComponent', () => {
  let component: MvarApiComponent;
  let fixture: ComponentFixture<MvarApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MvarApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MvarApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

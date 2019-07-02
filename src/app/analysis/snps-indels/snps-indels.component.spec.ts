import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnpsIndelsComponent } from './snps-indels.component';

describe('SnpsIndelsComponent', () => {
  let component: SnpsIndelsComponent;
  let fixture: ComponentFixture<SnpsIndelsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnpsIndelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnpsIndelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

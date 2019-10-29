import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnpIndelDetailsComponent } from './snp-indel-details.component';

describe('SnpIndelDetailsComponent', () => {
  let component: SnpIndelDetailsComponent;
  let fixture: ComponentFixture<SnpIndelDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnpIndelDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnpIndelDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

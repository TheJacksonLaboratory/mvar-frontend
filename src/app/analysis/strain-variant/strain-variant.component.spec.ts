import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StrainVariantComponent } from './strain-variant.component';

describe('StrainVariantComponent', () => {
  let component: StrainVariantComponent;
  let fixture: ComponentFixture<StrainVariantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StrainVariantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StrainVariantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

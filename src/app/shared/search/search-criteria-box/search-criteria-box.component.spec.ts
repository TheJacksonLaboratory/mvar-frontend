import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchCriteriaBoxComponent } from './search-criteria-box.component';

describe('SearchCriteriaBoxComponent', () => {
  let component: SearchCriteriaBoxComponent;
  let fixture: ComponentFixture<SearchCriteriaBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchCriteriaBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchCriteriaBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesNavComponent } from './files-nav.component';

describe('FilesNavComponent', () => {
  let component: FilesNavComponent;
  let fixture: ComponentFixture<FilesNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilesNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilesNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

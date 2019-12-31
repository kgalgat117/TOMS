import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTenentComponent } from './new-tenent.component';

describe('NewTenentComponent', () => {
  let component: NewTenentComponent;
  let fixture: ComponentFixture<NewTenentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewTenentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewTenentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

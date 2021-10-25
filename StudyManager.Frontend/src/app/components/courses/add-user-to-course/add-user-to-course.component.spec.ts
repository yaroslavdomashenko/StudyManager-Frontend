import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserToCourseComponent } from './add-user-to-course.component';

describe('AddUserToCourseComponent', () => {
  let component: AddUserToCourseComponent;
  let fixture: ComponentFixture<AddUserToCourseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUserToCourseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserToCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

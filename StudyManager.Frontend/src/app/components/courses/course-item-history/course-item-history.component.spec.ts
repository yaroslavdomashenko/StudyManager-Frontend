import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseItemHistoryComponent } from './course-item-history.component';

describe('CourseItemHistoryComponent', () => {
  let component: CourseItemHistoryComponent;
  let fixture: ComponentFixture<CourseItemHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseItemHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseItemHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

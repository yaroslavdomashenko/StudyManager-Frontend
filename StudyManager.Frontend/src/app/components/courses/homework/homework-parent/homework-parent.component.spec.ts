import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeworkParentComponent } from './homework-parent.component';

describe('HomeworkParentComponent', () => {
  let component: HomeworkParentComponent;
  let fixture: ComponentFixture<HomeworkParentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeworkParentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeworkParentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

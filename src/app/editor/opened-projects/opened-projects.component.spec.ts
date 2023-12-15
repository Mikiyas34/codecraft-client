import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenedProjectsComponent } from './opened-projects.component';

describe('OpenedProjectsComponent', () => {
  let component: OpenedProjectsComponent;
  let fixture: ComponentFixture<OpenedProjectsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OpenedProjectsComponent]
    });
    fixture = TestBed.createComponent(OpenedProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

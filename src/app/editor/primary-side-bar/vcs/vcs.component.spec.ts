import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VcsComponent } from './vcs.component';

describe('VcsComponent', () => {
  let component: VcsComponent;
  let fixture: ComponentFixture<VcsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VcsComponent]
    });
    fixture = TestBed.createComponent(VcsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

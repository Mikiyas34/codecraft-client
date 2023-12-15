import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrimarySideBarComponent } from './primary-side-bar.component';

describe('PrimarySideBarComponent', () => {
  let component: PrimarySideBarComponent;
  let fixture: ComponentFixture<PrimarySideBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PrimarySideBarComponent]
    });
    fixture = TestBed.createComponent(PrimarySideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

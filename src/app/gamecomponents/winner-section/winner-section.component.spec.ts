import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WinnerSectionComponent } from './winner-section.component';

describe('WinnerSectionComponent', () => {
  let component: WinnerSectionComponent;
  let fixture: ComponentFixture<WinnerSectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WinnerSectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WinnerSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

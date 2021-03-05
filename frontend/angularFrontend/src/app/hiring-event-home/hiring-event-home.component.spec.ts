import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiringEventHomeComponent } from './hiring-event-home.component';

describe('HiringEventHomeComponent', () => {
  let component: HiringEventHomeComponent;
  let fixture: ComponentFixture<HiringEventHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HiringEventHomeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HiringEventHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

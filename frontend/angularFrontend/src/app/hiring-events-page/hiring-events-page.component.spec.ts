import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HiringEventsPageComponent } from './hiring-events-page.component';

describe('HiringEventsPageComponent', () => {
  let component: HiringEventsPageComponent;
  let fixture: ComponentFixture<HiringEventsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HiringEventsPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HiringEventsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

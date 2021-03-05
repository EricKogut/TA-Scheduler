import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChairHoursComponent } from './chair-hours.component';

describe('ChairHoursComponent', () => {
  let component: ChairHoursComponent;
  let fixture: ComponentFixture<ChairHoursComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChairHoursComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChairHoursComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorRankingPageComponent } from './instructor-ranking-page.component';

describe('InstructorRankingPageComponent', () => {
  let component: InstructorRankingPageComponent;
  let fixture: ComponentFixture<InstructorRankingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InstructorRankingPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorRankingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

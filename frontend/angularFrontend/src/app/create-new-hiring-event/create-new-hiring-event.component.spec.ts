import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateNewHiringEventComponent } from './create-new-hiring-event.component';

describe('CreateNewHiringEventComponent', () => {
  let component: CreateNewHiringEventComponent;
  let fixture: ComponentFixture<CreateNewHiringEventComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateNewHiringEventComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewHiringEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

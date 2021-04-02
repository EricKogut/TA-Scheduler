import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlgorithmOrderSelectorComponent } from './algorithm-order-selector.component';

describe('AlgorithmOrderSelectorComponent', () => {
  let component: AlgorithmOrderSelectorComponent;
  let fixture: ComponentFixture<AlgorithmOrderSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlgorithmOrderSelectorComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlgorithmOrderSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

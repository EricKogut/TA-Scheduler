import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsesUploadPageComponent } from './responses-upload-page.component';

describe('ResponsesUploadPageComponent', () => {
  let component: ResponsesUploadPageComponent;
  let fixture: ComponentFixture<ResponsesUploadPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResponsesUploadPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsesUploadPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

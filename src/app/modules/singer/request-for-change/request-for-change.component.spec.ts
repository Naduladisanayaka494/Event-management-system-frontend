import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestForChangeComponent } from './request-for-change.component';

describe('RequestForChangeComponent', () => {
  let component: RequestForChangeComponent;
  let fixture: ComponentFixture<RequestForChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestForChangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestForChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTranactionComponent } from './edit-tranaction.component';

describe('EditTranactionComponent', () => {
  let component: EditTranactionComponent;
  let fixture: ComponentFixture<EditTranactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTranactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditTranactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

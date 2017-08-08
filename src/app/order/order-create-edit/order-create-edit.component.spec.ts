import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderCreateEditComponent } from './order-create-edit.component';

describe('OrderCreateEditComponent', () => {
  let component: OrderCreateEditComponent;
  let fixture: ComponentFixture<OrderCreateEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderCreateEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderCreateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});

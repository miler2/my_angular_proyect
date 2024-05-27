import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BleDataComponent } from './ble-data.component';

describe('BleDataComponent', () => {
  let component: BleDataComponent;
  let fixture: ComponentFixture<BleDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BleDataComponent]
    });
    fixture = TestBed.createComponent(BleDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

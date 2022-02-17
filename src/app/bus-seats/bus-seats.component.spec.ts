import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusSeatsComponent } from './bus-seats.component';

describe('BusSeatsComponent', () => {
  let component: BusSeatsComponent;
  let fixture: ComponentFixture<BusSeatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusSeatsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusSeatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

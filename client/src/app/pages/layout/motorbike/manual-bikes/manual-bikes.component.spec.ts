import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualBikesComponent } from './manual-bikes.component';

describe('ManualBikesComponent', () => {
  let component: ManualBikesComponent;
  let fixture: ComponentFixture<ManualBikesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManualBikesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManualBikesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

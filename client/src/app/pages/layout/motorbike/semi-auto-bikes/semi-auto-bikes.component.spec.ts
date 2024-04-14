import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemiAutoBikesComponent } from './semi-auto-bikes.component';

describe('SemiAutoBikesComponent', () => {
  let component: SemiAutoBikesComponent;
  let fixture: ComponentFixture<SemiAutoBikesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SemiAutoBikesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SemiAutoBikesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

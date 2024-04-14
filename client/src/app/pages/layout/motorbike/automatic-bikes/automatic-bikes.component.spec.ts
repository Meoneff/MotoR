import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutomaticBikesComponent } from './automatic-bikes.component';

describe('AutomaticBikesComponent', () => {
  let component: AutomaticBikesComponent;
  let fixture: ComponentFixture<AutomaticBikesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutomaticBikesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AutomaticBikesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

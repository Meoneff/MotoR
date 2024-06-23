import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MotorAdminComponent } from './motor-admin.component';

describe('MotorAdminComponent', () => {
  let component: MotorAdminComponent;
  let fixture: ComponentFixture<MotorAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MotorAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MotorAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

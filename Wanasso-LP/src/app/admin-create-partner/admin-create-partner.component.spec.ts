import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCreatePartnerComponent } from './admin-create-partner.component';

describe('AdminCreatePartnerComponent', () => {
  let component: AdminCreatePartnerComponent;
  let fixture: ComponentFixture<AdminCreatePartnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCreatePartnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCreatePartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvenementDetailComponent } from './evenement-detail.component';

describe('EvenementDetailComponent', () => {
  let component: EvenementDetailComponent;
  let fixture: ComponentFixture<EvenementDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvenementDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvenementDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

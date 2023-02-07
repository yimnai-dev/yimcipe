import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmPasswordTokenComponent } from './confirm-password-token.component';

describe('ConfirmPasswordTokenComponent', () => {
  let component: ConfirmPasswordTokenComponent;
  let fixture: ComponentFixture<ConfirmPasswordTokenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConfirmPasswordTokenComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ConfirmPasswordTokenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

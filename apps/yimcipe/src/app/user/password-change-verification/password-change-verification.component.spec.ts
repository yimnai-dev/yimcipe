import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordChangeVerificationComponent } from './password-change-verification.component';

describe('PasswordChangeVerificationComponent', () => {
  let component: PasswordChangeVerificationComponent;
  let fixture: ComponentFixture<PasswordChangeVerificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PasswordChangeVerificationComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(PasswordChangeVerificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { Component } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
    imports: [HttpClientModule, AppComponent]
}).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});

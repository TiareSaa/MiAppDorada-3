import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PanicPage } from './panic.page';

describe('PanicPage', () => {
  let component: PanicPage;
  let fixture: ComponentFixture<PanicPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PanicPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

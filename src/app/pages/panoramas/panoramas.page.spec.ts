import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PanoramasPage } from './panoramas.page';

describe('PanoramasPage', () => {
  let component: PanoramasPage;
  let fixture: ComponentFixture<PanoramasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PanoramasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

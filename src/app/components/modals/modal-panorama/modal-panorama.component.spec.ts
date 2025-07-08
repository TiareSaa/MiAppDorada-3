import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ModalPanoramaComponent } from './modal-panorama.component';

describe('ModalPanoramaComponent', () => {
  let component: ModalPanoramaComponent;
  let fixture: ComponentFixture<ModalPanoramaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [ModalPanoramaComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalPanoramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUploadImageComponent } from './form-upload-image.component';

describe('FormUploadImageComponent', () => {
  let component: FormUploadImageComponent;
  let fixture: ComponentFixture<FormUploadImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormUploadImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormUploadImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

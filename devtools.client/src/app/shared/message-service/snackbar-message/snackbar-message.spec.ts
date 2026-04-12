import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackbarMessage } from './snackbar-message';

describe('SnackbarMessage', () => {
  let component: SnackbarMessage;
  let fixture: ComponentFixture<SnackbarMessage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SnackbarMessage],
    }).compileComponents();

    fixture = TestBed.createComponent(SnackbarMessage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

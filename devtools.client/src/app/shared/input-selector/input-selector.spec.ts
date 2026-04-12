import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputSelector } from './input-selector';

describe('InputSelector', () => {
  let component: InputSelector;
  let fixture: ComponentFixture<InputSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputSelector],
    }).compileComponents();

    fixture = TestBed.createComponent(InputSelector);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

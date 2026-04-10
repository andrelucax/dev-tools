import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratorSelector } from './generator-selector';

describe('GeneratorPage', () => {
  let component: GeneratorSelector;
  let fixture: ComponentFixture<GeneratorSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneratorSelector],
    }).compileComponents();

    fixture = TestBed.createComponent(GeneratorSelector);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

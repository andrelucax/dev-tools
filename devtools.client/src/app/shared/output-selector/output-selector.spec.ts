import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OutputSelector } from './output-selector';

describe('OutputSelector', () => {
  let component: OutputSelector;
  let fixture: ComponentFixture<OutputSelector>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OutputSelector],
    }).compileComponents();

    fixture = TestBed.createComponent(OutputSelector);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

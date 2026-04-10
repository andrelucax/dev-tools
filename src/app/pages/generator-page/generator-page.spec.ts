import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneratorPage } from './generator-page';

describe('GeneratorPage', () => {
  let component: GeneratorPage;
  let fixture: ComponentFixture<GeneratorPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GeneratorPage],
    }).compileComponents();

    fixture = TestBed.createComponent(GeneratorPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

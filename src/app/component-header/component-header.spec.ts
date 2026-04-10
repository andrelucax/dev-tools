import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentHeader } from './component-header';

describe('ComponentHeader', () => {
  let component: ComponentHeader;
  let fixture: ComponentFixture<ComponentHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(ComponentHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentNav } from './component-nav';

describe('ComponentNav', () => {
  let component: ComponentNav;
  let fixture: ComponentFixture<ComponentNav>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponentNav],
    }).compileComponents();

    fixture = TestBed.createComponent(ComponentNav);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

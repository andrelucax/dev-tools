import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuidGenerator } from './guid-generator';

describe('GuidGenerator', () => {
  let component: GuidGenerator;
  let fixture: ComponentFixture<GuidGenerator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GuidGenerator],
    }).compileComponents();

    fixture = TestBed.createComponent(GuidGenerator);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

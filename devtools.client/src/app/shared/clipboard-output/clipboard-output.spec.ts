import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClipboardOutput } from './clipboard-output';

describe('ClipboardOutput', () => {
  let component: ClipboardOutput;
  let fixture: ComponentFixture<ClipboardOutput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClipboardOutput],
    }).compileComponents();

    fixture = TestBed.createComponent(ClipboardOutput);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

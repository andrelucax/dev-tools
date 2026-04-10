import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClipboardPage } from './clipboard-page';

describe('ClipboardPage', () => {
  let component: ClipboardPage;
  let fixture: ComponentFixture<ClipboardPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClipboardPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ClipboardPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HashPage } from './hash-page';

describe('HashPage', () => {
  let component: HashPage;
  let fixture: ComponentFixture<HashPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HashPage],
    }).compileComponents();

    fixture = TestBed.createComponent(HashPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

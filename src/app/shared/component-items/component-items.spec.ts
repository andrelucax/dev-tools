import { TestBed } from '@angular/core/testing';

import { ComponentItems } from './component-items';

describe('ComponentItems', () => {
  let service: ComponentItems;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComponentItems);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ConsoleGreetingsService } from './console-greetings-service';

describe('ConsoleGreetingsService', () => {
  let service: ConsoleGreetingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsoleGreetingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

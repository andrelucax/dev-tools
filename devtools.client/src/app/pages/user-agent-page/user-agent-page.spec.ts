import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAgentPage } from './user-agent-page';

describe('UserAgentPage', () => {
  let component: UserAgentPage;
  let fixture: ComponentFixture<UserAgentPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAgentPage],
    }).compileComponents();

    fixture = TestBed.createComponent(UserAgentPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

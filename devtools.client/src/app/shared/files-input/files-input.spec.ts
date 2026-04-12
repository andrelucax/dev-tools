import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilesInput } from './files-input';

describe('Files', () => {
  let component: FilesInput;
  let fixture: ComponentFixture<FilesInput>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FilesInput],
    }).compileComponents();

    fixture = TestBed.createComponent(FilesInput);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

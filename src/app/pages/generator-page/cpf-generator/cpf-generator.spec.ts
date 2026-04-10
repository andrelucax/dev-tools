import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpfGenerator } from './cpf-generator';

describe('CpfGenerator', () => {
  let component: CpfGenerator;
  let fixture: ComponentFixture<CpfGenerator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CpfGenerator],
    }).compileComponents();

    fixture = TestBed.createComponent(CpfGenerator);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

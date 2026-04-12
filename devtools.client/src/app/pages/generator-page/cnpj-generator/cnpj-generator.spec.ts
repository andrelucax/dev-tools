import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CnpjGenerator } from './cnpj-generator';

describe('CnpjGenerator', () => {
  let component: CnpjGenerator;
  let fixture: ComponentFixture<CnpjGenerator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CnpjGenerator],
    }).compileComponents();

    fixture = TestBed.createComponent(CnpjGenerator);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

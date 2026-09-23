import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Pc } from './pc';

describe('Pc', () => {
  let component: Pc;
  let fixture: ComponentFixture<Pc>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pc],
    }).compileComponents();

    fixture = TestBed.createComponent(Pc);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SegundoComponente } from './segundo-componente';

describe('SegundoComponente', () => {
  let component: SegundoComponente;
  let fixture: ComponentFixture<SegundoComponente>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SegundoComponente],
    }).compileComponents();

    fixture = TestBed.createComponent(SegundoComponente);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

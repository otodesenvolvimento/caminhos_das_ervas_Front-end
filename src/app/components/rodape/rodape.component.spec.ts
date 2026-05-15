import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RodapeComponent } from './rodape.component';

describe('RodapeComponent', () => {
  let component: RodapeComponent;
  let fixture: ComponentFixture<RodapeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RodapeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RodapeComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

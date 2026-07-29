import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShotScatterComponent } from './shot-scatter.component';

describe('ShotScatterComponent', () => {
  let component: ShotScatterComponent;
  let fixture: ComponentFixture<ShotScatterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShotScatterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShotScatterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
